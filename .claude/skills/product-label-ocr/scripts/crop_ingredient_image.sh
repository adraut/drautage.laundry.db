#!/usr/bin/env bash
# Crop or grid-annotate a detergent ingredient photo so a closer OCR pass can
# read it. Wraps whichever image tool is actually available (Docker + the
# dpokidov/imagemagick container, Podman as a drop-in swap, a local `magick`
# install, or Python/Pillow) so callers never hand-write a container
# invocation, MSYS_NO_PATHCONV, volume mounts, or -draw/-annotate grid args.
#
# Usage:
#   crop_ingredient_image.sh <image> --dims
#   crop_ingredient_image.sh <image> --grid [--step 500]
#   crop_ingredient_image.sh <image> --crop WxH+X+Y [--scale PCT] [--sharpen]
#
# Output files land next to <image>:
#   --grid  -> <stem>_grid.<ext>     (gridlines every --step px, labeled with
#                                      their y-value, so you can read off
#                                      where the ingredient panel starts/ends
#                                      instead of guessing coordinates)
#   --crop  -> <stem>_cropped.<ext>  (or <stem>_cropped_big.<ext> if --scale
#                                      is given)
#
# Exit code 2 means no crop tool is available at all — fall back to
# re-reading the full image with a prompt that focuses attention on the
# ingredient panel region instead (see the skill's SKILL.md).
#
# Runtime is auto-detected (docker > podman > magick > pillow) and cached to
# .crop_runtime_cache next to this script, so later calls — even in a later
# session — only re-verify the cached choice instead of re-running the full
# priority chain (each Bash tool call is a fresh shell, so an exported env
# var does NOT persist between calls; a file does). If the cached runtime
# stops working (e.g. Docker Desktop was uninstalled), detection
# automatically falls through to a fresh full chain and re-caches. Set
# CROP_RUNTIME=docker|podman|magick|pillow to force a specific runtime for
# one call without touching the cache.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CACHE_FILE="${SCRIPT_DIR}/.crop_runtime_cache"

IMAGE=""
MODE=""
GEOMETRY=""
STEP=500
SCALE=""
SHARPEN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dims) MODE="dims"; shift ;;
    --grid) MODE="grid"; shift ;;
    --crop) MODE="crop"; GEOMETRY="${2:-}"; shift 2 ;;
    --step) STEP="${2:-500}"; shift 2 ;;
    --scale) SCALE="${2:-}"; shift 2 ;;
    --sharpen) SHARPEN=1; shift ;;
    -h|--help)
      sed -n '2,25p' "$0"
      exit 0
      ;;
    *)
      if [[ -z "$IMAGE" ]]; then IMAGE="$1"; else echo "Unexpected argument: $1" >&2; exit 1; fi
      shift ;;
  esac
done

if [[ -z "$IMAGE" || -z "$MODE" ]]; then
  echo "Usage: $0 <image> --dims | --grid [--step N] | --crop WxH+X+Y [--scale PCT] [--sharpen]" >&2
  exit 1
fi
if [[ ! -f "$IMAGE" ]]; then
  echo "Image not found: $IMAGE" >&2
  exit 1
fi
if [[ "$MODE" == "crop" && -z "$GEOMETRY" ]]; then
  echo "--crop requires a geometry, e.g. --crop 2268x400+0+1780" >&2
  exit 1
fi

IMAGE_ABS="$(cd "$(dirname "$IMAGE")" && pwd)/$(basename "$IMAGE")"
IMAGE_DIR="$(dirname "$IMAGE_ABS")"
IMAGE_FILE="$(basename "$IMAGE_ABS")"
STEM="${IMAGE_FILE%.*}"
EXT="${IMAGE_FILE##*.}"

# Docker/Podman on Windows need a Windows-style drive path (C:/...) for the
# volume source, not the Git Bash-style /c/... path — otherwise the mount
# silently resolves to nothing inside the container and `magick` fails.
if command -v cygpath >/dev/null 2>&1; then
  IMAGE_DIR_MOUNT="$(cygpath -w "$IMAGE_DIR" | tr '\\' '/')"
else
  IMAGE_DIR_MOUNT="$IMAGE_DIR"
fi

runtime_works() {
  case "$1" in
    docker) docker info >/dev/null 2>&1 ;;
    podman) podman info >/dev/null 2>&1 ;;
    magick) magick --version >/dev/null 2>&1 ;;
    pillow) python -c "from PIL import Image" >/dev/null 2>&1 ;;
    *) return 1 ;;
  esac
}

full_detect() {
  for rt in docker podman magick pillow; do
    if runtime_works "$rt"; then
      echo "$rt"
      return
    fi
  done
  echo "none"
}

detect_runtime() {
  if [[ -n "${CROP_RUNTIME:-}" ]]; then
    echo "$CROP_RUNTIME"
    return
  fi
  if [[ -f "$CACHE_FILE" ]]; then
    CACHED="$(cat "$CACHE_FILE" 2>/dev/null || true)"
    if [[ -n "$CACHED" ]] && runtime_works "$CACHED"; then
      echo "$CACHED"
      return
    fi
  fi
  FOUND="$(full_detect)"
  [[ "$FOUND" != "none" ]] && echo "$FOUND" > "$CACHE_FILE"
  echo "$FOUND"
}

RUNTIME="$(detect_runtime)"
if [[ "$RUNTIME" == "none" ]]; then
  echo "No crop tool available (checked docker, podman, local magick, Pillow)." >&2
  echo "Fall back to re-reading the full image with a prompt focused on the ingredient panel region." >&2
  exit 2
fi
echo "crop_ingredient_image: using $RUNTIME (cached in ${CACHE_FILE})" >&2

container_magick() {
  MSYS_NO_PATHCONV=1 "$RUNTIME" run --rm --entrypoint magick \
    -v "${IMAGE_DIR_MOUNT}:/img" dpokidov/imagemagick "$@"
}

read_dims() {
  case "$RUNTIME" in
    docker|podman)
      container_magick identify -format "%w %h\n" "/img/${IMAGE_FILE}"
      ;;
    magick)
      magick identify -format "%w %h\n" "$IMAGE_ABS"
      ;;
    pillow)
      python -c "from PIL import Image; im = Image.open('${IMAGE_ABS}'); print(im.width, im.height)"
      ;;
  esac
}

case "$MODE" in
  dims)
    read DIMS_W DIMS_H < <(read_dims)
    echo "${DIMS_W}x${DIMS_H}"
    ;;

  grid)
    read DIMS_W DIMS_H < <(read_dims)
    OUT="${IMAGE_DIR}/${STEM}_grid.${EXT}"
    case "$RUNTIME" in
      docker|podman|magick)
        DRAW_ARGS=()
        Y=$STEP
        while (( Y < DIMS_H )); do
          DRAW_ARGS+=(-draw "line 0,${Y} ${DIMS_W},${Y}" -annotate "+20+$((Y - 10))" "y=${Y}")
          Y=$((Y + STEP))
        done
        if [[ "$RUNTIME" == "magick" ]]; then
          magick "$IMAGE_ABS" -font DejaVu-Sans -pointsize 80 -fill red -stroke red -strokewidth 3 \
            "${DRAW_ARGS[@]}" "$OUT"
        else
          container_magick "/img/${IMAGE_FILE}" -font DejaVu-Sans -pointsize 80 -fill red -stroke red -strokewidth 3 \
            "${DRAW_ARGS[@]}" "/img/${STEM}_grid.${EXT}"
        fi
        ;;
      pillow)
        python - "$IMAGE_ABS" "$OUT" "$STEP" <<'PYEOF'
import sys
from PIL import Image, ImageDraw
src, out, step = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src).convert("RGB")
draw = ImageDraw.Draw(im)
y = step
while y < im.height:
    draw.line([(0, y), (im.width, y)], fill=(255, 0, 0), width=4)
    draw.text((20, y - 20), f"y={y}", fill=(255, 0, 0))
    y += step
im.save(out)
PYEOF
        ;;
    esac
    echo "$OUT"
    ;;

  crop)
    OUT="${IMAGE_DIR}/${STEM}_cropped"
    [[ -n "$SCALE" ]] && OUT="${OUT}_big"
    OUT="${OUT}.${EXT}"
    case "$RUNTIME" in
      docker|podman|magick)
        ARGS=(-crop "$GEOMETRY" +repage)
        [[ -n "$SCALE" ]] && ARGS+=(-filter Lanczos -resize "${SCALE}%")
        [[ "$SHARPEN" == "1" ]] && ARGS+=(-sharpen 0x1)
        if [[ "$RUNTIME" == "magick" ]]; then
          magick "$IMAGE_ABS" "${ARGS[@]}" "$OUT"
        else
          container_magick "/img/${IMAGE_FILE}" "${ARGS[@]}" "/img/$(basename "$OUT")"
        fi
        ;;
      pillow)
        python - "$IMAGE_ABS" "$OUT" "$GEOMETRY" "$SCALE" <<'PYEOF'
import re, sys
from PIL import Image, ImageFilter
src, out, geometry, scale = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
m = re.match(r"(\d+)x(\d+)\+(\d+)\+(\d+)", geometry)
if not m:
    sys.exit(f"Unrecognized geometry: {geometry} (expected WxH+X+Y)")
w, h, x, y = map(int, m.groups())
im = Image.open(src).crop((x, y, x + w, y + h))
if scale:
    pct = int(scale) / 100
    im = im.resize((int(im.width * pct), int(im.height * pct)), Image.LANCZOS)
im.save(out)
PYEOF
        ;;
    esac
    echo "$OUT"
    ;;
esac
