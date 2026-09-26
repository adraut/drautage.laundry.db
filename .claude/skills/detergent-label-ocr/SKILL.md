---
name: detergent-label-ocr
description: >
  Transcribes a detergent ingredient list from packaging photos into a
  clean, ordered ingredient list, with confidence-flagged uncertain reads
  and the project's extraction rules (order preservation, "may contain"
  handling, P&G "MADE WITH" functional-category unpacking, OR-alternatives,
  colorant/alketh-vs-pareth conventions) already applied. Always use this
  skill whenever transcribing, OCR'ing, or reading ingredients off a
  detergent bottle/box photo for this repository — including from
  /import-detergents and /create-detergent-issue — rather than re-deriving
  the OCR prompt or the crop workflow inline.
compatibility: >
  Bash (Git Bash on Windows is fine). The cropping step additionally uses
  one of Docker, Podman, local ImageMagick, or Python+Pillow, auto-detected
  by scripts/crop_ingredient_image.sh — none of these are required for the
  full-image OCR pass, and the skill falls back to a focused full-image
  re-read if none are present.
---

# Detergent label OCR

Turns one or more ingredient-panel photos into a final, ordered ingredient
list ready to compare against an existing `DetergentProfile` or drop into a
new issue. Both `/import-detergents` and `/create-detergent-issue` call into
this skill for that step — the OCR prompt, cropping approach, and extraction
rules live here once so the two commands can't drift out of sync.

## 1. Full-image OCR (always do this first)

Use the `Read` tool with the absolute file path for each ingredient image.
When a group has more than one ingredient image, issue all the `Read` calls
in the same response so they run in parallel.

Prompt to use for each image:

> "Read the ingredient list from this image. Transcribe every ingredient
> name exactly as printed, in the order printed. After any word or character
> you are not 100% certain of, immediately append `[?]` — include your
> best-guess reading before the marker (e.g. `laureth-6 [?]`). For any text
> that is completely unreadable, write `[unreadable]` as a placeholder.
> Output the list as one ingredient per line. At the end, add a Confidence
> summary listing each flagged item with the reason for uncertainty (cut off,
> smudged, low contrast, ambiguous character, etc.)."

This is sufficient for most close-up shots. Only move to cropping if the
full-image pass produced `[?]` or `[unreadable]` items.

## 2. Crop and re-read (only when confidence is low)

Use `scripts/crop_ingredient_image.sh` for every crop/grid operation — it
wraps runtime detection (Docker → Podman → local `magick` → Python/Pillow),
container volume mounting, and the Windows path quirks that make these
commands tedious to hand-write. Never construct a `docker run`/`podman run`
ImageMagick invocation directly; call the script instead.

```
scripts/crop_ingredient_image.sh <image> --dims
scripts/crop_ingredient_image.sh <image> --grid [--step 500]
scripts/crop_ingredient_image.sh <image> --crop WxH+X+Y [--scale PCT] [--sharpen]
```

Workflow:

1. **Grid first, to find the region — don't guess coordinates.**
   `crop_ingredient_image.sh <image> --grid` draws horizontal gridlines
   labeled with their y-value across the full image (spaced every 500px by
   default; pass `--step` to change that) and prints the output path. Read
   that file with the `Read` tool — the ingredient panel will be visibly
   bracketed between two labeled lines, so you can read off `y_start` and
   `y_end` directly instead of estimating. Delete the grid file once you've
   read off the coordinates — it's a throwaway artifact, not something to
   leave in the batch directory.

2. **Crop to that region.**
   `crop_ingredient_image.sh <image> --crop <W>x<height>+0+<y_start>` where
   `height = y_end - y_start`. Add `--scale 300` (a percentage) if the
   region is still small in absolute pixels, and `--sharpen` if the source
   photo is a little soft — but see the note below on over-zooming.
   Re-read the cropped output with the OCR prompt from step 1.

3. **Don't chase resolution the photo doesn't have.** If several crop/scale
   attempts on the same region keep producing the same blur or the bottle's
   embossed/textured surface starts dominating the image instead of the
   text, you've hit the source photo's actual resolution ceiling — scaling
   further won't reveal more, it will just interpolate. Stop, use your best
   available reading, and record it as uncertain (or ask for a clearer
   photo) rather than continuing to re-crop.

4. **No tool available** (the script exits with code 2, meaning none of
   Docker, Podman, local ImageMagick, or Pillow were found): fall back to
   re-reading the full image with the step-1 prompt, prefixed with
   _"Focus only on the ingredient list panel in the [lower half / right
   column / etc.]. Ignore all other text."_

The script auto-detects which tool is available and caches the choice to a
file next to itself, so later calls — even in a later session — only
re-verify the cached runtime instead of re-running the full detection
chain (an exported env var wouldn't survive between separate Bash tool
calls, since each is a fresh shell — a file does). Set
`CROP_RUNTIME=docker|podman|magick|pillow` to force a specific runtime for
one call without touching the cache.

## 3. Multi-image reconciliation

When a group has more than one ingredient image (multiple angles, or the
same panel shot twice):

- Transcribe each image independently first.
- Where readings agree, treat that as high-confidence.
- Where they disagree, or one image has text the other is missing, flag the
  discrepancy as `[?]` rather than silently picking one.
- Prefer the clearest individual reading of each ingredient across all
  images — the highest-confidence version of each line wins, even if it
  came from a different photo than most of the rest of the list.

## 4. Extraction rules

Apply these to the final, reconciled ingredient text.

**Language:** English ingredients only if the label is bilingual. If
English is absent entirely, translate to English INCI names.

**Order is significant.** Preserve the exact printed sequence — never sort
or alphabetize. When comparing against an existing profile later, a
reordering counts as a real change, not noise.

**"May contain" / conditional ingredients:** Include them in the list at
the position where they're printed. Note each one in the issue Notes as
conditional, e.g. `"may contain: propylene glycol — included as
conditional"`.

**P&G "MADE WITH:" functional-category format** (Gain liquids, Tide Simply,
and similar): ingredients are grouped by function —
`"Cleaning Agents: (A; B). Stabilizers: (C). Enzymes: (D). ... Colorants.
Fragrances. Water."`

- Water is printed last in this format but is always first by
  concentration — **list Water first** in the extracted output.
- Otherwise follow the printed category order (Cleaning Agents →
  Stabilizers/Process Aids → Water Softener → Enzymes → Cleaning Aids →
  Odor Removers → Solvents → Preservative → Colorants → Fragrances).
- A conditional phrase embedded inside a category still follows the "may
  contain" rule above.

**OR alternatives:** packaging sometimes prints `"A or B"` or `"A and/or
B"`.

- If either option is already in the existing profile, treat the pair as
  satisfied — don't add or remove anything for it.
- If neither is in the profile, use the first-listed option and discard the
  rest.

**Colorants:**

- A specific colorant (`CI 42090`, `Pigment Blue 15`) → use that specific
  `Ingredient` enum entry.
- A generic term only (`Colorants`, `Dyes`) → use `Ingredient.Colorants`.
- Don't keep a specific colorant from an old profile if the current source
  only gives a generic term — replace it with the generic entry; the
  current packaging is authoritative.

**Alketh vs. Pareth:** these are distinct substances, not spelling
variants. `C10-16 alketh` → `C10_16Alketh`, never `C10_16Pareth`. If an
existing profile has the wrong one of these relative to what's printed now,
that's a real correction to flag, not something to leave alone out of
caution.

**Enzymes:** name specific enzymes when the packaging names them. If it
only says "enzymes" generically, note "enzymes TBD" — don't guess a
specific enzyme that isn't printed.

## 5. Ambiguities and the Needs Review table

Collect (without blocking):

- Any `[?]` or `[unreadable]` item, with its confidence reason and
  best-guess reading
- Ingredient names with no obvious `Ingredient` enum match
- A product name that could match more than one existing profile
- Any cross-image discrepancy that couldn't be reconciled
- When re-processing an existing issue/profile: any ingredient that changed
  from the prior version and whose identity is uncertain from the new
  images

If there are unresolved items, put this table at the top of the proposal,
before the issue body:

```markdown
## ⚠ Needs Review

The following items must be decided before this issue is created:

| #   | Position       | OCR reading                | Uncertainty reason         | Decision needed                                |
| --- | -------------- | -------------------------- | -------------------------- | ---------------------------------------------- |
| 1   | Ingredient #4  | `acty/decyl glucoside [?]` | Characters blurred         | `DecylGlucoside` or `CaprylylCaprylGlucoside`? |
| 2   | Ingredient #12 | `[unreadable]`             | Text cut off at image edge | Skip, mark TBD, or provide a better image?     |
```

The issue body below the table should still use the best-guess reading for
each uncertain item (marked `[?]`) so it's otherwise complete and can be
approved with minimal edits once the open items are resolved. Never silently
accept a best-guess reading without recording it as uncertain somewhere.

## 6. Comparing against an existing profile

If a `DetergentProfile` file already exists for this product, map each
`Ingredient.EnumName` in it to its plain-text equivalent and compare against
the freshly extracted list, **including order**:

- Identical sequence → the profile is up to date; no issue needed.
- Anything added, removed, or reordered → this is a real change; note
  exactly what changed and why (e.g. "packaging now reads X instead of Y",
  "these two enzymes moved after the preservative in the printed order").

## Data source field

Whatever consumes this skill's output needs a `**Data source:**` field in
the issue's Product details section:

- `Package` — ingredients came from packaging photos (this skill's normal
  case).
- `SDS` — ingredients came from a Safety Data Sheet instead.

Manufacturer product pages and SmartLabel pages (`smartlabel.pg.com`,
JavaScript-rendered and inaccessible via fetch) are never valid primary
sources — fall back to packaging images or an SDS.
