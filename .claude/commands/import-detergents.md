# Import Detergents from Image Pairs

Processes a batch of detergent packaging photos stored in `import/detergents/`,
creating or updating GitHub issues for each product. Progress is tracked in
`import/detergents/IMPORT_LOG.md`.

## Usage

```
/import-detergents [log_path]
```

- **With log path** — uses that file as the tracking log
- **Without argument** — defaults to `import/detergents/IMPORT_LOG.md`

## Overview

Images come in consecutive pairs (sorted alphabetically by filename):
- **Odd image** (1st of pair) — front of packaging: brand, product name, variant
- **Even image** (2nd of pair) — ingredient list panel

The log file tracks which pairs have been processed so the batch can be
resumed across sessions.

## Steps

### 1. Read the import log

Read the log at the given path (or the default). The log is a Markdown table
with columns: `#`, `Front image`, `Ingredient image`, `Product`, `Status`,
`Notes`.

Status values:
- `pending` — not yet started
- `identified` — front image read, product identified, not yet processed
- `issue-created` — GitHub issue was created
- `skipped` — intentionally skipped (e.g. duplicate, out of scope)
- `up-to-date` — existing profile matches packaging; no issue needed

Find the **first row with status `pending`** and begin there. Process pairs
one at a time in order, pausing for user input when needed.

### 2. For each pending pair

#### Step 2a — Identify the product (front image)

Read the front image. Extract:
- Brand name
- Product name
- Variant (if any)
- Detergent type (Liquid / Powder / Pod / Other)
- Region/country (if visible)

If the image is unclear or the product cannot be identified, ask the user
before continuing.

#### Step 2b — Check for an existing profile

Construct the expected filename:
- Lowercase brand, product name, and variant
- Replace spaces and special characters with hyphens
- Pattern: `<brand>-<product name>[-<variant>].ts`
- Example: brand="Tide", product="Original", variant="Liquid" → `tide-original-liquid.ts`

Check `src/components/Detergent/data/profiles/<filename>`.

#### Step 2c — Read the ingredient image

Read the ingredient image. Apply the following rules during extraction:

**Language:** If bilingual, use English ingredients only and discard all
other language versions. If English is absent, translate to English INCI names.

**OR alternatives:** Packaging sometimes lists `"A or B"` or `"A and/or B"`.
- If either option is already in the existing profile, treat the OR pair as
  satisfied — do not add or remove anything for that pair.
- If neither option is in the profile (new product or new ingredient), use
  the **first-listed** option and discard the rest.

**Colorants:**
- If the packaging names a specific colorant (e.g., `CI 42090`,
  `Pigment Blue 15`), use that specific `Ingredient` enum entry.
- If the packaging only lists a generic term (`Colorants`, `Dyes`), use
  `Ingredient.Colorants` (generic).
- Do **not** keep a specific colorant in the profile if the current source
  only lists a generic term — replace with the generic entry.

**Alketh vs. Pareth:** These are distinct substances. If the packaging says
`C10-16 alketh`, use `C10_16Alketh` — do not map to `C10_16Pareth`.

**Enzymes:** If the source names a specific enzyme (e.g., "amylase enzyme",
"subtilisin"), list it by name. If the source only says "enzymes" generically,
note it as TBD in the issue rather than guessing.

#### Step 2d — Compare vs. existing profile (if profile found)

Map each `Ingredient.EnumName` in the profile to its plain-text equivalent
and compare against the extracted ingredient list (order-insensitive).

- **Identical sets** → mark as `up-to-date`, no issue needed.
- **Different sets** → note added and removed ingredients; create an Update issue.

If no profile exists → create an Add issue.

#### Step 2e — Confirm ambiguities with the user

Before creating the issue, raise any ambiguities:
- OCR uncertainty (smudged, cut-off, or low-contrast text)
- Ingredient names that are unclear or have no obvious enum match
- Whether a product name matches an existing profile title

Pause and wait for the user's response before proceeding.

#### Step 2f — Create the GitHub issue

Follow the issue format from `/create-detergent-issue`:

- **Add** issue: `gh issue create --title "Add <Brand> <Product>" --label "enhancement,Detergent"`
- **Update** issue: `gh issue create --title "Update <Brand> <Product>" --label "enhancement,Detergent,update"`

Use separate `--label` flags (not comma-separated) to avoid label-not-found errors.

#### Step 2g — Update the log

After the issue is created (or the pair is skipped/up-to-date), update the
row in the log:
- Set the `Product` column to the identified product name
- Set the `Status` column to the appropriate value
- Add a brief note in the `Notes` column (issue number, key changes, OR rules applied, etc.)

### 3. Continue to the next pending pair

Repeat from step 2 for each subsequent `pending` row. After each pair, check
whether the user wants to continue or pause.

## Notes

- Always update the log before moving to the next pair.
- Never skip updating the log even if a pair is up-to-date or skipped.
- If a pair's front image is ambiguous, mark it `identified` with a note and
  wait for user clarification before processing the ingredient image.
- SmartLabel pages (`smartlabel.pg.com`) are JavaScript-rendered and
  inaccessible via fetch. Fall back to the ingredient image.
- The issue is a review checkpoint — do not create profiles automatically.
  Always stop after creating the issue for each pair.
