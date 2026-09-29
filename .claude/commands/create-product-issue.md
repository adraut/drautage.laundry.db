---
description: Create a product GitHub issue from label photos
argument-hint: [detergent|booster] [front-image] [ingredient-image ...]
allowed-tools: Read, Write, Glob, Grep, Skill, AskUserQuestion, Bash(gh:*), Bash(rm:*), Bash(bash:*)
---

<!--
Usage:   /create-product-issue [type] [front-image] [ingredient-image ...]
Example: /create-product-issue ./tide-front.jpg ./tide-back.jpg
         /create-product-issue booster ./oxi-front.jpg ./oxi-side.jpg ./oxi-back.jpg
         /create-product-issue            (manual entry)
-->

Create a GitHub issue for a single laundry product from packaging images or
manual input. Arguments: `$ARGUMENTS`

The OCR, cropping, multi-image reconciliation, and extraction rules come from
the `product-label-ocr` skill, shared with `/import-products`. Only the
single-product flow is defined here.

## 0. Parse arguments

- If the first argument is a product type key from
  @.claude/skills/product-label-ocr/references/product-types.md
  (case-insensitive), that is the **type**; the remaining arguments are
  images.
- Of the images, the first is the **front image**; the rest are
  **ingredient images** (multiple angles improve accuracy).
- No images → follow **Manual input** below.

## With images

**Run steps 1, 2, and 3 in parallel** (step 2 can start once step 1 has the
brand/product name).

### 1. Identify the product (front image)

Read the front image. Extract brand, product name, variant, product form
(Liquid / Powder / Pod / …), and region/country if visible.

If no type was given, resolve it from the packaging using the rules in
`product-types.md`; if still unsure, ask. If the type is not supported,
stop as that file instructs. If the front image is unclear or the product
can't be identified, ask before continuing.

**Data source** comes from the primary ingredient source: packaging photo →
`Package`; Safety Data Sheet → `SDS`. Manufacturer pages and SmartLabel
pages are not valid primary sources.

### 2. Check for an existing profile

Expected filename: lowercase brand, product name, and variant, hyphenated —
`<brand>-<product>[-<variant>].ts` (e.g. `tide-original-liquid.ts`). Check
the type's **profiles dir** from the table.

### 3. OCR the ingredient images

Use the `product-label-ocr` skill for all ingredient images in parallel.
Its output is the final ordered list with uncertain items flagged `[?]` or
`[unreadable]`. Use its bundled crop script — never hand-write a
docker/podman ImageMagick command.

### 4. Compare with the existing profile

If a profile exists, compare using the skill's section 6 (including order):

- **Identical** → tell the user the profile is up to date and stop. No issue.
- **Different** → note added, removed, and reordered ingredients; this is an
  **Update** issue.

No profile → **Add** issue.

### 5. Collect ambiguities

Gather unresolved items without blocking, using the skill's section 5
checklist.

### 6. Write the proposal file

Write the issue title and body to `ISSUE_<slug>.md` next to the images
(e.g. `ISSUE_tide-purclean-honey-lavender.md`). The body follows the type's
**issue template** (`.github/ISSUE_TEMPLATE/add-<type>.md` or
`update-<type>.md`) — fill every field, including **Data source**, and note
the ingredient list language in Notes.

For Update issues, add an `## Ingredient changes` section (added, removed,
reordered) and reference the existing profile path.

If there are ambiguities, put the skill's `## ⚠ Needs Review` table at the
top; the body below still uses best-guess readings marked `[?]`.

### 7. Review, then create the issue

Summarize for the user: product, type, Add/Update, ingredient count, new enum
entries needed, resolved OCR uncertainties, and open review items.

**Stop and wait** until the user resolves review items and explicitly
confirms. Then run, using the table's **label** and separate `--label` flags:

- Add: `gh issue create --title "Add <Brand> <Product>" --label "enhancement" --label "<Label>" --body-file <proposal>`
- Update: same with `--title "Update <Brand> <Product>"` and an extra `--label "update"`
- Correcting an existing issue: `gh issue edit <number> --body-file <proposal>`

Strip the Needs Review section from the body before submitting. After the
GitHub action succeeds, delete the proposal file, report the issue URL, and
remind the user they can run `/add-product <issue-number>` after reviewing it.

## Manual input

Ask for all of these at once: product type (if not given), brand, product
name, variant, product form, ingredient list (pasted as-is), region, and
source URL (blank if packaging only).

Normalize the list with the skill's extraction rules, check for an existing
profile (step 2), and continue from step 4.

## Rules

- All issue content is in English; translate only when English is absent
  from the packaging.
- Never sort or reorder ingredients.
- Every `[?]` reading must appear in the Needs Review table — never silently
  accept a best guess.
- The issue is a review checkpoint: never create profiles here. Always stop
  after creating the issue.
- SmartLabel pages (`smartlabel.pg.com`) can't be fetched; use the images.
