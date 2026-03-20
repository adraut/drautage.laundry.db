# Create Detergent GitHub Issue

Creates a GitHub issue for a single detergent product from packaging images or
manual input.

> **Sync note:** The image-processing rules in this skill (cropping, OCR
> confidence, multi-image reconciliation, extraction rules, profile comparison,
> proposal file format) must be kept in sync with the equivalent steps in
> `/import-detergents`. If you update one, update the other.

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

### Step 2 — Check for an existing profile

Construct the expected filename:

- Lowercase brand, product name, and variant
- Replace spaces and special characters with hyphens
- Pattern: `<brand>-<product name>[-<variant>].ts`
- Example: brand="Tide", product="Original", variant="Liquid" →
  `tide-original-liquid.ts`

Check `src/components/Detergent/data/profiles/<filename>`.

**Run this step in parallel with step 1 and step 3.**

### Step 3 — Crop and OCR each ingredient image

**Run all ingredient images in parallel.**

#### Crop first (greatly improves accuracy)

Before reading, crop each ingredient image to the ingredient list panel.
The goal is to give the model maximum resolution on just the text.

**Tool detection** — check for available tools once per session, in priority order:

1. **Docker + ImageMagick** (`docker info`) — preferred. Use the
   `dpokidov/imagemagick` image. Pull once: `docker pull dpokidov/imagemagick`.
2. **Local ImageMagick** (`magick --version`) — install on Windows via
   `winget install ImageMagick.Q16-HDRI`.
3. **Python + Pillow** (`python -c "from PIL import Image"`) — install via
   `pip install Pillow`.

**If a tool is available — automated crop:**

1. Read the full image to locate the ingredient list region (express as
   approximate pixel coordinates or percentages from top-left).
2. Run the crop command:
   - Docker + ImageMagick:
     ```
     docker run --rm -v "<image_dir>:/img" dpokidov/imagemagick \
       magick "/img/<filename>" -crop <WxH+X+Y> +repage "/img/<stem>_cropped.jpg"
     ```
   - Local ImageMagick:
     `magick "<input>" -crop <WxH+X+Y> +repage "<stem>_cropped.jpg"`
   - Pillow:
     `python -c "from PIL import Image; img=Image.open('<input>'); img.crop((<x1>,<y1>,<x2>,<y2>)).save('<stem>_cropped.jpg')"`

**If no tool is available — two-pass approach:**

1. Pass 1: Read the full image. Note the approximate region of the ingredient
   list (e.g., "lower 60%, right half of panel").
2. Pass 2: Read the full image again with the explicit instruction:
   _"Transcribe ONLY the ingredient list text in the [described region].
   Ignore all other text. Read character by character."_

#### OCR with confidence annotation

When reading the (cropped) image, apply these annotation rules:

- Mark any word or phrase you are not fully certain about with `[?]`.
  Include your best-guess reading in-line, e.g., `laureth-6 [?]`.
- Mark completely unreadable text as `[unreadable]`.
- At the end of the transcription, output a **Confidence summary** listing
  every `[?]` and `[unreadable]` item with the reason for uncertainty
  (cut off, smudged, low contrast, ambiguous character, etc.).

#### Multi-image reconciliation

When more than one ingredient image is provided, merge the OCR results:

- Use each image's transcription independently.
- Where they agree, accept the reading as high-confidence.
- Where they disagree or one is missing text the other has, note the
  discrepancy and flag it as `[?]`.
- Prefer the clearest read of any individual ingredient across all images.

### Step 4 — Apply extraction rules

Apply these rules to the final merged ingredient text:

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

### Step 5 — Compare vs. existing profile (if found)

Map each `Ingredient.EnumName` in the profile to its plain-text equivalent
and compare against the extracted ingredient list, **including order**.

- **Identical sequence** → inform the user the profile is already up-to-date
  and stop. Do not create an issue.
- **Different ingredients or different order** → note added, removed, and
  reordered ingredients; create an Update issue.

If no profile exists → create an Add issue.

### Step 6 — Collect ambiguities

Gather all unresolved items without blocking:

- Any `[?]` or `[unreadable]` item from OCR, with its confidence reason and
  best-guess reading
- Ingredient names with no obvious enum match
- Product name that may match more than one existing profile
- Any discrepancy between multiple ingredient images that could not be
  reconciled

### Step 7 — Write the proposal file

Write the proposed issue title and body to `ISSUE_<slug>.md` in the same
directory as the images (e.g., `ISSUE_tide-purclean-honey-lavender.md`).

**If there are no ambiguities:** write the proposal file normally.

**If there are ambiguities:** add a `## ⚠ Needs Review` section at the top,
before the issue body, with a table of every unresolved item:

```markdown
## ⚠ Needs Review

The following items must be decided before this issue is created:

| # | Position | OCR reading | Uncertainty reason | Decision needed |
|---|----------|-------------|-------------------|-----------------|
| 1 | Ingredient #4 | `acty/decyl glucoside [?]` | Characters blurred | `DecylGlucoside` or `CaprylylCaprylGlucoside`? |
| 2 | Ingredient #12 | `[unreadable]` | Text cut off at image edge | Skip, mark TBD, or provide a better image? |
```

The issue body below the review section uses the best-guess reading for each
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

### Step 8 — Present for review and create the issue

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

Then apply the extraction rules from step 4 to normalize the pasted list,
check for an existing profile (step 5), and proceed from step 6 onward.

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
