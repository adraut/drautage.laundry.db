# Import Detergents from Image Groups

Processes a batch of detergent packaging photos, creating or updating GitHub
issues for each product. Progress is tracked in an `IMPORT_LOG.md` alongside
the images.

> OCR, cropping, multi-image reconciliation, and the ingredient extraction
> rules are shared with `/create-detergent-issue` via the
> `detergent-label-ocr` skill — see step 2c below.

## Usage

```
/import-detergents [path]
```

- **`path` is a directory** — treated as the batch directory (where the
  images live). The log is always `<path>/IMPORT_LOG.md`.
- **`path` is a `.md` file** — treated as the log file directly; its parent
  directory is the batch directory.
- **No argument** — defaults to batch directory `import/detergents/`.

## Overview

A batch directory can be organized either way — detect which one you've got
before building the log (step 1b):

- **Flat** — all images sit directly in the batch directory. Sort them
  alphabetically by filename; a **front-of-package** image starts a new
  group, and every image up to (but not including) the next front image is
  an **ingredient image** for that group.
- **Pre-grouped** — the batch directory contains only subdirectories, one
  per product, each already holding that product's photos (this is a common
  way people organize photos as they take them — e.g. one folder per bottle).
  Each subdirectory is one group already; don't apply the alphabetical
  front/ingredient heuristic across the whole batch. Instead, classify the
  images _within_ each subdirectory independently — read them to determine
  which one is the front image rather than assuming filename order reflects
  that (phone camera filenames rarely do).
- **Mixed** — some loose images plus some subdirectories: treat the loose
  images as their own flat-mode group set, and each subdirectory as its own
  pre-formed group.

Whichever structure it is, don't stop to ask the user about it unless a
specific group is genuinely ambiguous (see the edge cases below) — the
directory layout itself is not something to confirm up front.

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

Record image filenames as paths **relative to the batch directory** (e.g.
`{Brand} {Product Name} {Type}/*.jpg` in pre-grouped
mode, not just the bare filename) — otherwise two subdirectories with
similarly-named photos (common with phone camera filenames) will collide in
the "already recorded" check.

### Step 1b — Detect structure and inventory

List the batch directory's immediate contents to determine which structure
it is (flat, pre-grouped, or mixed — see Overview above).

For the **flat** portion: list all `.jpg` / `.jpeg` / `.png` files directly
in the batch directory, sorted alphabetically. Exclude `_cropped` images
(derived artifacts, not sources) and any filename already recorded in the
log.

For the **pre-grouped** portion: each subdirectory with unrecorded images is
one group to classify (step 1c still applies within it — you still need to
work out which image is the front).

If no unrecorded images remain anywhere, Phase 1 is complete — proceed to
Phase 2.

### Step 1c — Classify in batches, writing after each

For the flat portion, process unrecorded images in **parallel batches of 5**,
strictly in alpha order, maintaining an "open group" the same way as always
(see below). For the pre-grouped portion, process each subdirectory as its
own unit — read all its images together (a subdirectory rarely has more than
a handful of photos, so there's no need to sub-batch it) and determine which
one is the front image directly from its content.

After each batch (or each pre-grouped subdirectory) completes, immediately
update the log before moving on. This ensures classification can be resumed
if interrupted.

**Classify each image as one of:**

- **Front image** — shows the front of the packaging (brand, product name,
  prominent label design).
- **Ingredient image** — shows the ingredient list panel, back of package,
  or a close-up of the ingredient text.
- **Unknown** — ambiguous (side panel without ingredients, nutrition facts,
  completely unclear). Ask the user before assigning. Do not block — flag it
  in the Notes of the current open group and continue.

**In flat mode, maintain an "open group" across batches.** Each time a front
image is seen, the previously open group is complete; open a new one.
Ingredient and unknown images are appended to the currently open group.

**After each batch of 5 (flat mode), update the log:**

1. For each group that was **completed** in this batch (its closing front image
   was found), append or update its log row with `Status = pending`.
2. For the **currently open group** (last group, no closing front image yet),
   upsert its log row with `Status = classifying` and whatever filenames have
   been collected so far. This row will be updated in subsequent batches as
   more ingredient images are found.

**When all flat-mode batches are done**, update the final open group's
`Status` from `classifying` to `pending`.

**After each pre-grouped subdirectory, update the log:** one row per
subdirectory, `Status = pending`, front/ingredient images split by what you
determined from reading them.

**Edge cases:**

- First image ever is an ingredient image (no preceding front): open a group
  with no front image, set `Status = pending`, `Notes = "missing front image"`.
  Ask the user before Phase 2 processes this group.
- Multiple front images in a row (flat mode): the second front closes the
  prior group; if that prior group had no ingredient images, set
  `Notes = "no ingredient images found"` and ask the user before Phase 2
  processes it.
- A pre-grouped subdirectory with no image that reads as a front (e.g. all
  ingredient close-ups) or with more than one plausible front image: set
  `Notes` describing the ambiguity and ask the user before Phase 2 processes
  it — same as the flat-mode edge cases above.
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

The **data source** is determined from the primary source used for ingredients:

- Physical packaging (photo of the package label) → `Package`
- Safety Data Sheet (SDS) → `SDS`

Manufacturer product pages and SmartLabel pages are **not** valid primary
sources (they are often out of date) and do not map to either value — fall
back to packaging images or the SDS instead.

### Step 2b — Check for an existing profile

Construct the expected filename:

- Lowercase brand, product name, and variant
- Replace spaces and special characters with hyphens
- Pattern: `<brand>-<product name>[-<variant>].ts`
- Example: brand="Tide", product="Original", variant="Liquid" →
  `tide-original-liquid.ts`

Check `src/components/Detergent/data/profiles/<filename>`.

**Run this check in parallel with step 2c.**

### Step 2c — OCR each ingredient image

**Run all ingredient images for this group in parallel.** Use the
`detergent-label-ocr` skill for the full-image OCR prompt, cropping (via its
bundled script — never hand-write a docker/podman ImageMagick invocation),
multi-image reconciliation, and the extraction rules (language, order, "may
contain", P&G "MADE WITH" category unpacking, OR-alternatives, colorants,
alketh vs. pareth, enzymes). That skill's output is the final, ordered
ingredient list for this group, with uncertain items flagged `[?]` or
`[unreadable]`.

If the skill's crop step produces a `_cropped` file, record its filename in
the log's `Ingredient image(s)` column.

### Step 2d — Compare vs. existing profile (if found)

Use the `detergent-label-ocr` skill's profile-comparison approach: map each
`Ingredient.EnumName` in the profile to its plain-text equivalent and
compare against the extracted ingredient list, **including order**.

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

**If there are ambiguities:** write the proposal file with the
`## ⚠ Needs Review` table described in the `detergent-label-ocr` skill
(section 5) at the top, before the issue body. The issue body below it
should still use the best-guess reading for each uncertain item (marked
`[?]`) so the proposal is otherwise complete and can be approved with
minimal edits once decisions are made.

The issue body's **Product details** section must include the skill's
`**Data source:**` field.

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

| Phase          | What runs in parallel                | What runs serially                 |
| -------------- | ------------------------------------ | ---------------------------------- |
| Phase 1        | Image reads (batches of 5)           | Group formation (must be in order) |
| Phase 2        | All pending groups (fully parallel)  | —                                  |
| Step 2c        | All ingredient images within a group | Crop → then OCR                    |
| Steps 2b + 2c  | Profile check and ingredient OCR     | — (fully parallel)                 |
| Phase 3 Path A | All `proposal-ready` issue creations | Log updates per issue              |
| Phase 3 Path B | —                                    | One group at a time (user-driven)  |

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
