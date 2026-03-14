# Create Detergent GitHub Issue

Creates a GitHub issue for a new detergent product using either a packaging
image (OCR) or manually entered information.

## Usage

```
/create-detergent-issue [image_path]
```

- **With image path** — reads the image and extracts ingredients via OCR
- **Without argument** — prompts for manual input

## Steps

### If an image path was provided

1. **Read the image file** using the Read tool. The image should show the
   ingredient list from the product packaging.

2. **Identify the language(s)** of the text in the image. Packaging may be
   multilingual or in a language other than English.
   - If you can confidently identify the language from the image, proceed.
   - If the language is ambiguous or unrecognized, **ask the user before
     continuing** — do not attempt to extract or translate ingredients until
     the language is confirmed.

3. **Extract the ingredient list.** Ingredient lists are typically delimited by
   commas, slashes, dots, or bullets. Count the number of delimited items in
   the image — this is the expected ingredient count.

   **Handling multilingual lists:** Packaging often repeats the ingredient list
   in multiple languages (e.g., English followed by French for each ingredient,
   or two full lists side by side).
   - If English is present, use the English ingredients only and discard all
     other language versions.
   - If English is not present, translate all ingredients to English (see below).
   - After language filtering, deduplicate the list — remove any ingredient that
     appears more than once.
   - Verify the final deduplicated count. If it does not match the expected
     count from the image (accounting for the multilingual duplication), note
     the discrepancy in the confirmation step.

   **Translation (non-English only):** Translate ingredient names to their
   standard English chemical/INCI names where a clear equivalent exists. If a
   term has no direct English equivalent or the translation is uncertain,
   include the original text in parentheses, e.g. `Surfactant (tensioactivo)`.

   **Extract:**
   - Brand name
   - Product name
   - Product variant (if visible)
   - Detergent type (Liquid / Powder / Pod / Other)
   - Full ingredient list (English, deduplicated, one per line)
   - Region/country (if visible on packaging)

   If any field is not legible or not present on the packaging, note it as
   unknown rather than guessing.

4. **Confirm the extracted data with the user** before creating the issue.
   Display the English ingredient list, note the source language(s), the raw
   count from the image, and the final deduplicated count. Ask if it looks
   correct and allow the user to make corrections.

### If no image path was provided

1. **Ask the user for the following information** (you may ask all at once):
   - Brand name
   - Product name
   - Product variant (if any)
   - Detergent type (Liquid / Powder / Pod / Other)
   - Ingredient list (paste as-is from packaging or label)
   - Region (if known)
   - Source URL (if known — leave blank if packaging only)

### Create the issue

2. **Create the GitHub issue** using the collected data:
   ```
   gh issue create \
     --title "Add <Brand> <Product Name>" \
     --label "enhancement,Detergent" \
     --body "## Product details

   - **Brand:** <brand>
   - **Product name:** <product name>
   - **Product variant (if any):** <variant or 'N/A'>
   - **Detergent type:** <type>

   ## Ingredient source(s)

   - **Primary source:** <'packaging image' if from photo, otherwise source type>
   - **Source URL:** <URL or 'N/A'>
   - **Date accessed:** <today's date>
   - **Region (if applicable):** <region or 'not specified'>

   ## Ingredient list (optional but recommended)

   \`\`\`
   <ingredient list, one per line>
   \`\`\`

   ## Notes

   - **Ingredient list language:** <source language, or 'English' if no translation was needed>
   <any ambiguities noted during OCR, translation, or entry, or 'None' if no others>
   "
   ```

3. **Report the issue URL** to the user and remind them they can run
   `/add-detergent <issue_number>` once they have reviewed the issue.

## Notes

- All issue content must be in English. If English is present on the packaging,
  use it directly. Only translate when English is absent.
- If English is present alongside other languages, discard the non-English
  ingredients — do not mix languages in the output list.
- Always deduplicate the ingredient list before writing it to the issue.
- Always verify the final ingredient count against the raw count from the image
  and report any discrepancy to the user at the confirmation step.
- Do not infer or guess missing text — note it as unknown.
- If OCR is ambiguous (e.g., smudged text, cut-off label), note each uncertain
  ingredient clearly rather than guessing.
- The issue is a review checkpoint. Do not proceed to create a profile
  automatically — always stop after creating the issue.
