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

- Preferred: Use a single authoritative source when possible: manufacturer product page, documentation page, SmartLabel page, SDS sheet, or packaging image.
- Blog/social sources require cross‑reference with at least one authoritative source.
- If unable to access sources due to network restrictions, use the ingredient list provided in the GitHub issue (treat as authoritative).
- Record: source URL, date accessed, and region (if provided).

## Add a new detergent profile

1. Create a new profile file in [data/profiles](data/profiles) named: <brand>-<product>-<variant>.ts (lowercase, hyphenated).
2. Implement a `DetergentProfile` with:
   - `name` and `brand` as recognized by consumers.
   - `type` using `DetergentType`.
   - `ingredients` array using `Ingredient` enum values.
3. Export the profile in [data/profiles/index.ts](data/profiles/index.ts).
4. Populate optional fields when available:
   - `countryOfOrigin`
   - `countriesAvailable`
   - `isHardWaterTolerant`

## Ingredients rules

- Use ingredients exactly as listed in the authoritative source.
- If an ingredient is missing from the enum, add it in [../common/types/Ingredient.ts](../common/types/Ingredient.ts) and categorize it in the proper set (see [../common/types/AGENTS.md](../common/types/AGENTS.md)).
- Do **not** invent or infer specific ingredients.
- Ambiguous surfactants (e.g., “C12‑15 alcohols ethoxylated”): use the generic ingredient enum only.
- Enzyme lists that are generic: do **not** add specific enzyme ingredients; note “enzymes TBD”.
- Unknown ingredients: do **not** add a placeholder enum; note unknowns in the PR.
- Fragrance/dye: only add if explicitly listed in the ingredient source.

## Tests

- Tests should not depend on counts or ordering and should remain deterministic.
- Update tests only if new ingredient categories or detection rules are added and coverage is needed.

## Pull request requirements

- Open a **draft PR**.
- Use the PR template and fill in:
  - `Closes #<issue_number>` to link and auto-close the issue.
  - Source link(s) with date accessed and region, or note if using ingredient list from issue.
  - List of unknown/ambiguous ingredients.
  - Note if enzymes are TBD.
