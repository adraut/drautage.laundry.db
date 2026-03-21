# Import Detergents from Image Groups

Processes a batch of detergent packaging photos stored in `import/detergents/`,
creating or updating GitHub issues for each product. Progress is tracked in
`import/detergents/IMPORT_LOG.md`.

> **Sync note:** The image-processing rules in this skill (cropping, OCR
> confidence, multi-image reconciliation, extraction rules, profile comparison,
> proposal file format) must be kept in sync with the equivalent steps in
> `/create-detergent-issue`. If you update one, update the other.

## Usage

```
/import-detergents [log_path]
```

- **With log path** — uses that file as the tracking log
- **Without argument** — defaults to `import/detergents/IMPORT_LOG.md`

## Overview

Images are sorted alphabetically by filename. A **front-of-package** image
starts a new group. All subsequent images up to (but not including) the next
front image are **ingredient list images** for that group. A group therefore
has exactly 1 front image and 1 or more ingredient images.

The log file tracks which groups have been processed so the batch can be
resumed across sessions.

## Phase 1 — Build the import log (if new or incomplete)

Run this phase whenever the log does not contain all source images in the
batch directory, including when the log does not exist at all.

### Step 1a — Create or open the log

**If the log does not exist**, create it immediately with just the header row:

```
| # | Front image | Ingredient image(s) | Product | Status | Notes |
|---|-------------|---------------------|---------|--------|-------|
```

**If the log exists**, read it. Note which source images (non-`_cropped`) are
already recorded in any row — these are already classified and will be skipped.
Note any row whose `Status` is `classifying` — that group's classification was
interrupted and must be completed before processing resumes (see step 1c).

### Step 1b — Inventory

List all `.jpg` / `.jpeg` / `.png` files in the batch directory, sorted
alphabetically. Exclude `_cropped` images (derived artifacts, not sources).
Exclude any filename already recorded in the log.

If no unrecorded images remain, Phase 1 is complete — proceed to Phase 2.

### Step 1c — Classify in batches, writing after each

Process the unrecorded images in **parallel batches of 5**, strictly in
alpha order. After each batch completes, immediately update the log before
starting the next batch. This ensures classification can be resumed if
interrupted.

**Classify each image as one of:**

- **Front image** — shows the front of the packaging (brand, product name,
  prominent label design).
- **Ingredient image** — shows the ingredient list panel, back of package,
  or a close-up of the ingredient text.
- **Unknown** — ambiguous (side panel without ingredients, nutrition facts,
  completely unclear). Ask the user before assigning. Do not block — flag it
  in the Notes of the current open group and continue.

**Maintain an "open group" across batches.** Each time a front image is
seen, the previously open group is complete; open a new one. Ingredient and
unknown images are appended to the currently open group.

**After each batch of 5, update the log:**

1. For each group that was **completed** in this batch (its closing front image
   was found), append or update its log row with `Status = pending`.
2. For the **currently open group** (last group, no closing front image yet),
   upsert its log row with `Status = classifying` and whatever filenames have
   been collected so far. This row will be updated in subsequent batches as
   more ingredient images are found.

**When all batches are done**, update the final open group's `Status` from
`classifying` to `pending`.

**Edge cases:**

- First image ever is an ingredient image (no preceding front): open a group
  with no front image, set `Status = pending`, `Notes = "missing front image"`.
  Ask the user before Phase 2 processes this group.
- Multiple front images in a row: the second front closes the prior group; if
  that prior group had no ingredient images, set `Notes = "no ingredient images
  found"` and ask the user before Phase 2 processes it.
- `unknown` images: append to the current open group, flag in Notes.

Status values:

- `classifying` — group is being built; classification of its images is not yet complete (transient; always resolved before Phase 2)
- `pending` — fully classified; not yet processed by Phase 2
- `identified` — front image read, product identified, not yet processed
- `proposal-ready` — proposal file written, no unresolved ambiguities; ready for issue creation
- `needs-review` — proposal file written, contains unresolved items requiring a decision
- `issue-created` — GitHub issue was created
- `skipped` — intentionally skipped (e.g. duplicate, out of scope)
- `up-to-date` — existing profile matches packaging; no issue needed

Always update the log before moving to the next group. Never skip a log
update even if a group is up-to-date or skipped.

## Phase 2 — Process pending groups

Find all rows with status `pending`. Process **all of them in parallel**.
Each group produces a proposal file and a log status update. There is no
blocking ambiguity gate — ambiguities are embedded in the proposal file and
flagged in the log. Issue creation happens in Phase 3.

**Never create GitHub issues automatically.** Do not call `gh issue create`
or `gh issue edit` without explicit user approval. Parallelism applies only
to research, OCR, and proposal writing — never to GitHub actions.

For each pending group, execute steps 2a–2g concurrently with other groups.

### Step 2a — Identify the product (front image)

Read the front image. Extract:

- Brand name
- Product name
- Variant (if any)
- Detergent type (Liquid / Powder / Pod / Other)
- Region/country (if visible)

If the image is unclear or the product cannot be identified, pause and ask
the user before continuing. Mark the row `identified` in the log once
the product is confirmed.

### Step 2b — Check for an existing profile

Construct the expected filename:

- Lowercase brand, product name, and variant
- Replace spaces and special characters with hyphens
- Pattern: `<brand>-<product name>[-<variant>].ts`
- Example: brand="Tide", product="Original", variant="Liquid" →
  `tide-original-liquid.ts`

Check `src/components/Detergent/data/profiles/<filename>`.

**Run this check in parallel with step 2c.**

### Step 2c — Crop and OCR each ingredient image

**Run all ingredient images for this group in parallel.**

#### OCR strategy — full image first, crop only if needed

**Step 1 — Full-image OCR (always):**

Use the `Read` tool with the absolute file path for each ingredient image.
To run multiple ingredient images in parallel, issue all `Read` calls in the
same response. Use this prompt when reading each image:

> "Read the ingredient list from this image. Transcribe every ingredient
> name exactly as printed, in the order printed. After any word or character
> you are not 100% certain of, immediately append `[?]` — include your
> best-guess reading before the marker (e.g. `laureth-6 [?]`). For any text
> that is completely unreadable, write `[unreadable]` as a placeholder.
> Output the list as one ingredient per line. At the end, add a Confidence
> summary listing each flagged item with the reason for uncertainty (cut off,
> smudged, low contrast, ambiguous character, etc.)."

This pass is sufficient for most close-up shots.

**Step 2 — Crop and re-OCR (only when confidence is low):**

If the full-image pass produced any `[?]` or `[unreadable]` items, crop to
the ingredient list panel and re-read using the same prompt above. Use the
higher-confidence reading per ingredient across both passes.

**Tool detection for cropping** — check once per session, in priority order:

1. **Docker + ImageMagick** (`docker info`) — preferred container runtime.
   Use the `dpokidov/imagemagick` image. Pull once: `docker pull dpokidov/imagemagick`.
2. **Podman + ImageMagick** (`podman info`) — drop-in Docker alternative;
   commands are identical with `podman` substituted for `docker`.
   Pull once: `podman pull dpokidov/imagemagick`.
3. **Local ImageMagick** (`magick --version`) — install on Windows via
   `winget install ImageMagick.Q16-HDRI`.
4. **Python + Pillow** (`python -c "from PIL import Image"`) — install via
   `pip install Pillow`.

Set `RUNTIME` to whichever is found first (`docker` or `podman`) and reuse
it for all crop commands in this session.

**Crop commands** (run only when step 2 is triggered):

1. Note the ingredient list region from the full-image read.

2. **Get image dimensions.** Use `MSYS_NO_PATHCONV=1` to prevent Git Bash
   from rewriting container paths, and `--entrypoint magick` because the
   `dpokidov/imagemagick` image defaults to the legacy `convert` entrypoint:
   ```
   MSYS_NO_PATHCONV=1 <RUNTIME> run --rm --entrypoint magick \
     -v "C:/path/to/batch dir:/img" dpokidov/imagemagick \
     identify -format "%wx%h\n" "/img/<filename>"
   ```

3. **Generate a coordinate grid overlay** and read it to pinpoint the
   ingredient region in one shot. Draw horizontal lines every 500 px labeled
   with their y-value, then read the resulting image to see exactly which
   gridlines bracket the ingredient text — no guessing required.

   Generate the grid (substitute `<W>` with the image width from step 2, and
   add/remove lines to cover the full height at 500 px intervals):
   ```
   MSYS_NO_PATHCONV=1 <RUNTIME> run --rm --entrypoint magick \
     -v "C:/path/to/batch dir:/img" dpokidov/imagemagick \
     "/img/<filename>" \
     -font DejaVu-Sans -pointsize 80 -fill red -stroke red -strokewidth 3 \
     -draw "line 0,500 <W>,500"    -annotate +20+490  "y=500" \
     -draw "line 0,1000 <W>,1000"  -annotate +20+990  "y=1000" \
     -draw "line 0,1500 <W>,1500"  -annotate +20+1490 "y=1500" \
     -draw "line 0,2000 <W>,2000"  -annotate +20+1990 "y=2000" \
     -draw "line 0,2500 <W>,2500"  -annotate +20+2490 "y=2500" \
     -draw "line 0,3000 <W>,3000"  -annotate +20+2990 "y=3000" \
     -draw "line 0,3500 <W>,3500"  -annotate +20+3490 "y=3500" \
     "/img/<stem>_grid.jpg"
   ```

   Read `<stem>_grid.jpg` with the `Read` tool. The ingredient text will be
   visibly bracketed between two labeled gridlines — read off the y-values
   and compute: `height = y_end - y_start`, crop = `<W>x<height>+0+<y_start>`.
   Delete the grid file after reading it.

4. Run the crop. **Paths with spaces must be quoted; use forward slashes for
   Windows paths in container volume mounts. Always set `MSYS_NO_PATHCONV=1`
   and `--entrypoint magick` for the `dpokidov/imagemagick` image.**

   Crop geometry: `WxH+X+Y` = width × height + left offset + top offset
   from top-left corner (all in pixels).

   - Docker or Podman + ImageMagick:
     ```
     MSYS_NO_PATHCONV=1 <RUNTIME> run --rm --entrypoint magick \
       -v "C:/path/to/batch dir:/img" dpokidov/imagemagick \
       "/img/<filename>" -crop <WxH+X+Y> +repage "/img/<stem>_cropped.jpg"
     ```
   - Local ImageMagick:
     `magick "<input>" -crop <WxH+X+Y> +repage "<stem>_cropped.jpg"`
   - Pillow:
     `python -c "from PIL import Image; img=Image.open('<input>'); img.crop((<x1>,<y1>,<x2>,<y2>)).save('<stem>_cropped.jpg')"`
   - **No tool available:** re-read the full image with the prompt above,
     prefixed with: _"Focus only on the ingredient list panel in the
     [lower half / right column / etc.]. Ignore all other text."_

4. Record the cropped filename in the log's `Ingredient image(s)` column.

#### OCR with confidence annotation

The prompt in step 1 above covers confidence annotation inline. As a reminder:

- Uncertain text → `best-guess reading [?]` inline
- Completely unreadable → `[unreadable]`
- End of transcription → **Confidence summary** with each flagged item and
  reason (cut off, smudged, low contrast, ambiguous character, etc.)

#### Multi-image reconciliation

When a group has more than one ingredient image, merge the OCR results:

- Use each image's transcription independently.
- Where they agree, accept the reading as high-confidence.
- Where they disagree or one is missing text the other has, note the
  discrepancy and flag it as `[?]`.
- Prefer the clearest read of any individual ingredient across all images.

#### Extraction rules

Apply the following rules after collecting the final ingredient text:

**Language:** If bilingual, use English ingredients only. If English is
absent, translate to English INCI names.

**Order:** Preserve the exact printed sequence. Do not sort, alphabetize, or
reorder. Ingredient order is significant.

**"May contain" / conditional ingredients:** Include in the list. Note each
one in the issue Notes as conditional, e.g.
`"may contain: propylene glycol — included as conditional"`.

**Functional-category labels (P&G "MADE WITH:" format):** Gain liquids, Tide
Simply, and some other P&G products list ingredients by function group:
`"Cleaning Agents: (A; B). Stabilizers: (C). Enzymes: (D). ... Colorants. Fragrances. Water."`

- Water appears last in this format but is always first by concentration.
  **List Water first.**
- Follow the printed category sequence for all other ingredients
  (Cleaning Agents → Stabilizers/Process Aids → Water Softener → Enzymes →
  Cleaning Aids → Odor Removers → Solvents → Preservative → Colorants →
  Fragrances).
- Conditional phrases embedded in a category apply the "may contain" rule.

**OR alternatives:** Packaging sometimes lists `"A or B"` or `"A and/or B"`.

- If either option is already in the existing profile, treat the OR pair as
  satisfied — do not add or remove anything for that pair.
- If neither option is in the profile, use the **first-listed** option and
  discard the rest.

**Colorants:**

- Specific colorant named (e.g., `CI 42090`, `Pigment Blue 15`) → use that
  specific `Ingredient` enum entry.
- Generic term only (`Colorants`, `Dyes`) → use `Ingredient.Colorants`.
- Do **not** keep a specific colorant if the current source only gives a
  generic term — replace with the generic entry.

**Alketh vs. Pareth:** Distinct substances. `C10-16 alketh` →
`C10_16Alketh`, not `C10_16Pareth`.

**Enzymes:** Name specific enzymes when named on packaging. If only
"enzymes" generically, note TBD in the issue; do not guess.

### Step 2d — Compare vs. existing profile (if found)

Map each `Ingredient.EnumName` in the profile to its plain-text equivalent
and compare against the extracted ingredient list, **including order**.

- **Identical sequence** → mark as `up-to-date`, no issue needed.
- **Different ingredients or different order** → note added, removed, and
  reordered ingredients; create an Update issue.

If no profile exists → create an Add issue.

### Step 2e — Collect ambiguities

Gather all unresolved items for this group. Do **not** block — proceed
directly to step 2f. Ambiguities are recorded in the proposal file and
reflected in the log status.

Ambiguity types to collect:

- Any `[?]` or `[unreadable]` item from OCR, with its confidence reason and
  best-guess reading
- Ingredient names with no obvious enum match
- Product name that may match more than one existing profile
- Any discrepancy between multiple ingredient images that could not be
  reconciled across images
- For re-processing: any ingredient that changed from the existing issue and
  whose identity is uncertain from the new images

### Step 2f — Write the proposal file

Write the proposed issue title and body to a markdown file in the batch
import directory immediately — do not wait for ambiguities to be resolved.

- Filename: `ISSUE_GROUP_<##>_<slug>.md`
  (e.g., `ISSUE_GROUP_05_7th-gen-easydose-lavender.md`)
- For re-processing an existing issue, include a diff summary: what changed
  from the current issue body and why.

**If there are no ambiguities:** write the proposal file normally.

**If there are ambiguities:** write the proposal file with a
`## ⚠ Needs Review` section at the top, before the issue body, containing
a table of every unresolved item:

```markdown
## ⚠ Needs Review

The following items must be decided before this issue is created:

| # | Position | OCR reading | Uncertainty reason | Decision needed |
|---|----------|-------------|-------------------|-----------------|
| 1 | Ingredient #4 | `acty/decyl glucoside [?]` | Characters blurred | `DecylGlucoside` or `CaprylylCaprylGlucoside`? |
| 2 | Ingredient #12 | `[unreadable]` | Text cut off at image edge | Skip, mark TBD, or provide a better image? |
```

The issue body below the review section should use the best-guess reading
for each uncertain item (marked with `[?]`) so the proposal is otherwise
complete and can be approved with minimal edits once decisions are made.

### Step 2g — Update the log

After writing the proposal file (or determining the group is skipped /
up-to-date), update the log row:

- `Product` — identified product name
- `Status`:
  - `proposal-ready` — proposal written, no unresolved ambiguities
  - `needs-review` — proposal written, has items in the `## ⚠ Needs Review` table
  - `skipped` — intentional duplicate or out-of-scope
  - `up-to-date` — profile matches packaging exactly
- `Notes` — proposal filename, ingredient count, new enum entries needed,
  OCR uncertainty summary, OR rules applied, crop notes, etc.

After all pending groups are processed, print a one-line summary:
`N proposal-ready, M needs-review, K skipped, J up-to-date`
and remind the user of the two available next steps (Phase 3).

## Phase 3 — Create issues

After Phase 2 completes, the user chooses one or both paths:

### Path A — Bulk create (no-review groups)

When the user says something like _"create issues for all proposal-ready
groups"_:

1. Read all `proposal-ready` rows from the log.
2. For each, read its proposal file and execute the appropriate command:
   - **New Add issue:**
     `gh issue create --title "Add <Brand> <Product>" --label "enhancement" --label "Detergent"`
   - **New Update issue:**
     `gh issue create --title "Update <Brand> <Product>" --label "enhancement" --label "Detergent" --label "update"`
   - **Correcting an existing issue:**
     `gh issue edit <number> --body "<corrected body>"`
3. Use separate `--label` flags (not comma-separated).
4. After each GitHub action succeeds:
   - Delete the proposal file (`rm "ISSUE_GROUP_<##>_<slug>.md"`)
   - Update the log row: `Status` → `issue-created`, add issue number to `Notes`
5. Report a summary when all are done.

### Path B — Step-through review (needs-review groups)

When the user says something like _"show me the ones that need review"_:

1. Find all `needs-review` rows in the log, in group order.
2. Present the first group: display the `## ⚠ Needs Review` table and the
   full proposal body, clearly separated.
3. **Stop and wait** for the user to resolve each item in the review table.
   The user may:
   - Provide the correct ingredient name / enum for a `[?]` item
   - Decide to skip a `[unreadable]` item or mark it TBD
   - Approve the best-guess reading as-is
4. Update the proposal file body with the resolved readings and remove the
   `## ⚠ Needs Review` section.
5. Ask the user to confirm the updated proposal before creating the issue.
6. Once confirmed, create the issue (same commands as Path A), delete the
   proposal file, and update the log.
7. Proceed to the next `needs-review` group without stopping unless the user
   asks to pause.

## Parallelism summary

| Phase | What runs in parallel | What runs serially |
|---|---|---|
| Phase 1 | Image reads (batches of 5) | Group formation (must be in order) |
| Phase 2 | All pending groups (fully parallel) | — |
| Step 2c | All ingredient images within a group | Crop → then OCR |
| Steps 2b + 2c | Profile check and ingredient OCR | — (fully parallel) |
| Phase 3 Path A | All `proposal-ready` issue creations | Log updates per issue |
| Phase 3 Path B | — | One group at a time (user-driven) |

## Notes

- Always update the log before moving to the next group.
- Never skip updating the log even if a group is up-to-date or skipped.
- If a group's front image is ambiguous, mark it `identified` with a note
  and wait for user clarification before processing ingredient images. This
  is the only blocking pause in Phase 2.
- SmartLabel pages (`smartlabel.pg.com`) are JavaScript-rendered and
  inaccessible via fetch. Fall back to the ingredient images.
- **Same product, different bottle size** — mark as `skipped` (duplicate).
  Only the first occurrence of a formula needs an issue. Note the skipped
  group's size and the original issue number in the Notes column.
- The issue is a review checkpoint — do not create profiles automatically.
- Low OCR confidence (`[?]` items) must appear in the proposal file's
  `## ⚠ Needs Review` table. Never silently accept a best-guess reading
  without recording it as uncertain.
