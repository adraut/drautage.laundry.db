# AGENTS.md (Detergent)

Purpose: instructions for adding a new detergent profile.

## Scope

These instructions apply to detergent profiles under [src/components/Detergent](src/components/Detergent).

## Required inputs from issue

- Product name
- Brand name
- Ingredient source(s): URL, date accessed, region
  - If sources are inaccessible (network restrictions), use the ingredient list provided in the issue

## Sources (required or optional ingredient list fallback)

- Valid sources: physical packaging (photo of the package label) or SDS sheet.
- Manufacturer product pages and SmartLabel pages are **not** valid sources — they are often out of date.
- Blog/social sources are **not** valid sources.
- If unable to access sources, use the ingredient list provided in the GitHub issue (treat as authoritative).
- Record: source URL (if applicable), date accessed, and region (if provided).

## Add a new detergent profile

1. Create a new profile file in [data/profiles](data/profiles) named: <brand>-<product>-<variant>.ts (lowercase, hyphenated).
2. Implement a `DetergentProfile` with:
   - `name` and `brand` as recognized by consumers.
   - `type` using `DetergentType`.
   - `dataSource` using `DataSource` (`Package` or `SDS`) as specified in the issue.
   - `lastUpdated` set to the **date accessed** from the issue. Always use this date — do not leave it at a prior value.
   - `ingredients` array using `Ingredient` enum values.
3. Export the profile in [data/profiles/index.ts](data/profiles/index.ts). Profiles should be exported in alphabetical order.
4. Populate optional fields when available:
   - `countryOfOrigin`
   - `countriesAvailable`
   - `isHardWaterTolerant`

## Ingredients rules

- Use ingredients exactly as listed in the authoritative source.
- **Never assume a spelling variation in an ingredient name is a typo.** Treat the name as given; only map it to an existing enum entry if it is a confirmed synonym.
- A **synonym** is an alternate name for the exact same substance (e.g., "Ethanolamine Citrate" is a synonym for MEA-citrate). A more specific ingredient that belongs to a broader group is **not** a synonym — it is a separate ingredient.
- If an ingredient from the source is a confirmed synonym for an existing enum entry, map it to that entry and add or update a comment with the synonym (e.g., `Fragrance = 'Fragrance', // also listed as: Long Lasting Fragrance`).
- If a more common name exists for an ingredient already in the enum, replace the enum value string with the more common name.
- If an ingredient cannot be matched to an existing enum entry by exact name or confirmed synonym (including more-specific ingredients that are subtypes of a broader group), add it as a new ingredient.
- If an ingredient is missing from the enum, add it in [../common/types/Ingredient.ts](../common/types/Ingredient.ts) and categorize it in the proper set (see [../common/types/AGENTS.md](../common/types/AGENTS.md)).
- Do **not** invent or infer specific ingredients.
- Ambiguous surfactants (e.g., “C12‑15 alcohols ethoxylated”): use the generic ingredient enum only.
- Enzyme lists that are generic: do **not** add specific enzyme ingredients; note “enzymes TBD”.
- Unknown ingredients: do **not** add a placeholder enum; note unknowns in the PR.
- Fragrance/dye: only add if explicitly listed in the ingredient source.
- **SmartLabel “DL” suffix:** Ingredients suffixed with “DL” (e.g., `SubtilisinDL`, `Sodium BorateDL`) are SmartLabel notation meaning “Declared on Label”. Strip the suffix and treat the remainder as the ingredient name.
- **SmartLabel “Enzyme” suffix:** Ingredients listed as “&lt;Name&gt; EnzymeDL” (e.g., `Amylase EnzymeDL`) should have the suffix stripped; treat the base name as the ingredient (e.g., `Amylase`).
- **Plural vs. singular:** Source may list “Fragrances” (plural); map to the `Fragrance` enum value (singular).

## Tests

- Tests should not depend on counts or ordering and should remain deterministic.
- Update tests only if new ingredient categories or detection rules are added and coverage is needed.

## Pull request requirements

- Open a **draft PR**.
- Do **not** modify `package-lock.json` — adding a detergent profile requires no dependency changes.
- Use the .github/PULL_REQUEST_TEMPLATE/detergent.md PR template (no default template) and fill in:
  - `Closes #<issue_number>` to link and auto-close the issue.
  - Source link(s) with date accessed and region, or note if using ingredient list from issue.
  - List of unknown/ambiguous ingredients.
  - Note if enzymes are TBD.
