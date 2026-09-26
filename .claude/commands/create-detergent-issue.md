# Create Detergent GitHub Issue

Creates a GitHub issue for a single detergent product from packaging images or
manual input.

> OCR, cropping, multi-image reconciliation, and the ingredient extraction
> rules are shared with `/import-detergents` via the `detergent-label-ocr`
> skill — see step 3 below. Only the flow around it (single product vs. a
> batch) differs between the two commands.

## Usage

```
/create-detergent-issue [front_image] [ingredient_image ...]
```

- **With images** — `front_image` is the packaging front; one or more
  `ingredient_image` paths follow (multiple angles are supported and improve
  accuracy)
- **Without arguments** — prompts for manual input

## If images were provided

### Step 1 — Identify the product (front image)

Read the front image. Extract:

- Brand name
- Product name
- Variant (if any)
- Detergent type (Liquid / Powder / Pod / Other)
- Region/country (if visible)

If the image is unclear or the product cannot be identified, ask the user
before continuing.

**Run this step in parallel with step 2 and step 3.**

The **data source** is determined from the primary source used for ingredients:

- Physical packaging (photo of the package label) → `Package`
- Safety Data Sheet (SDS) → `SDS`

Manufacturer product pages and SmartLabel pages are **not** valid primary
sources (they are often out of date) and do not map to either value — fall
back to packaging images or the SDS instead.

### Step 2 — Check for an existing profile

Construct the expected filename:

- Lowercase brand, product name, and variant
- Replace spaces and special characters with hyphens
- Pattern: `<brand>-<product name>[-<variant>].ts`
- Example: brand="Tide", product="Original", variant="Liquid" →
  `tide-original-liquid.ts`

Check `src/components/Detergent/data/profiles/<filename>`.

**Run this step in parallel with step 1 and step 3.**

### Step 3 — OCR each ingredient image

**Run all ingredient images in parallel.** Use the `detergent-label-ocr`
skill for the full-image OCR prompt, cropping (via its bundled script — you
should never hand-write a docker/podman ImageMagick invocation), multi-image
reconciliation, and the extraction rules (language, order, "may contain",
P&G "MADE WITH" category unpacking, OR-alternatives, colorants, alketh vs.
pareth, enzymes). That skill's output is the final, ordered ingredient list
for this product, with uncertain items flagged `[?]` or `[unreadable]`.

### Step 4 — Compare vs. existing profile (if found)

Use the `detergent-label-ocr` skill's profile-comparison approach: map each
`Ingredient.EnumName` in the existing profile to its plain-text equivalent
and compare against the extracted ingredient list, **including order**.

- **Identical sequence** → inform the user the profile is already up-to-date
  and stop. Do not create an issue.
- **Different ingredients or different order** → note added, removed, and
  reordered ingredients; create an Update issue.

If no profile exists → create an Add issue.

### Step 5 — Collect ambiguities

Gather all unresolved items without blocking — see the `detergent-label-ocr`
skill's ambiguity checklist (uncertain OCR items, no-enum-match ingredients,
multi-profile name matches, unreconciled cross-image discrepancies).

### Step 6 — Write the proposal file

Write the proposed issue title and body to `ISSUE_<slug>.md` in the same
directory as the images (e.g., `ISSUE_tide-purclean-honey-lavender.md`).

**If there are no ambiguities:** write the proposal file normally.

**If there are ambiguities:** add the `## ⚠ Needs Review` table described in
the `detergent-label-ocr` skill (section 5) at the top, before the issue
body. The issue body below it still uses the best-guess reading for each
uncertain item (marked `[?]`) so the proposal is otherwise complete and
requires only targeted edits once decisions are made.

The issue body follows the standard format:

- **Add issue body:**

  ```
  ## Product details

  - **Brand:** <brand>
  - **Product name:** <product name>
  - **Product variant (if any):** <variant or 'N/A'>
  - **Detergent type:** <type>
  - **Data source:** <Package / SDS>

  ## Ingredient source(s)

  - **Primary source:** packaging image
  - **Source URL:** N/A
  - **Date accessed:** <today's date>
  - **Region (if applicable):** <region or 'not specified'>

  ## Ingredient list

  ```

  <ingredient list, one per line>

  ```

  ## Notes

  - **Ingredient list language:** <source language, or 'English'>
  <conditional ingredients, OCR uncertainties resolved, OR rules applied, etc., or 'None'>
  ```

- **Update issue body:** same as above but with a `## Ingredient changes`
  section listing added, removed, and reordered ingredients, and a reference
  to the existing profile path.

### Step 7 — Present for review and create the issue

Present a concise summary to the user:

- Product name and action type (Add / Update)
- Number of ingredients; new enum entries needed
- Any resolved OCR uncertainties and how they were resolved
- Any remaining `## ⚠ Needs Review` items requiring a decision

**Stop and wait** for the user to resolve any review items and explicitly
confirm before creating the issue.

Once confirmed, execute the appropriate command:

- **New Add issue:**
  `gh issue create --title "Add <Brand> <Product>" --label "enhancement" --label "Detergent"`
- **New Update issue:**
  `gh issue create --title "Update <Brand> <Product>" --label "enhancement" --label "Detergent" --label "update"`
- **Correcting an existing issue:**
  `gh issue edit <number> --body "<corrected body>"`

Use separate `--label` flags (not comma-separated).

After the GitHub action succeeds, **delete the proposal file**
(`rm "ISSUE_<slug>.md"`).

Report the issue URL and remind the user they can run
`/add-detergent <issue_number>` once they have reviewed the issue.

## If no images were provided

Ask the user for the following (all at once):

- Brand name
- Product name
- Product variant (if any)
- Detergent type (Liquid / Powder / Pod / Other)
- Ingredient list (paste as-is from packaging or label)
- Region (if known)
- Source URL (if known — leave blank if packaging only)

Then apply the `detergent-label-ocr` skill's extraction rules to normalize
the pasted list, check for an existing profile (step 2), and proceed from
step 5 onward.

## Notes

- If the front image is unclear or the product cannot be identified, ask the
  user before doing any further work.
- Low OCR confidence (`[?]` items) must appear in the proposal file's
  `## ⚠ Needs Review` table. Never silently accept a best-guess reading
  without recording it as uncertain.
- All issue content must be in English. If English is present on the
  packaging, use it directly. Only translate when English is absent.
- Always preserve ingredient order. Do not sort, alphabetize, or reorder.
- The issue is a review checkpoint — do not create profiles automatically.
  Always stop after creating the issue.
- SmartLabel pages (`smartlabel.pg.com`) are JavaScript-rendered and
  inaccessible via fetch. Fall back to the ingredient images.
