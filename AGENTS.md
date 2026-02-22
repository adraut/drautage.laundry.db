# Agent Instructions

This file provides guidance for AI agents adding new detergent products to this repository.

## Quick start

When an issue is opened with a product request (brand + product name), agents should:

1. Read the detailed instructions in the relevant folder.
2. Fetch ingredient information from the authoritative source(s) provided in the issue, or use the ingredient list if sources are inaccessible.
3. **Never assume a spelling variation in an ingredient name is a typo.** Treat the name as given; only map to an existing enum entry if it is a confirmed synonym.
4. Create a draft PR with all changes. Ingredient and product additions should not change any dependencies. Do not commit package-lock.json changes or any other project configuration file like it.
5. Include source links, date accessed, region (or note if using issue ingredient list), and list any unknowns/ambiguities.

## Folder-specific instructions

- [src/components/Detergent/AGENTS.md](src/components/Detergent/AGENTS.md) – Adding detergent profiles
- [src/components/common/types/AGENTS.md](src/components/common/types/AGENTS.md) – Ingredient enum and category management

## PR checklist

Before submitting:

- [ ] Profile file created in [src/components/Detergent/data/profiles](src/components/Detergent/data/profiles)
- [ ] Profile exported in [src/components/Detergent/data/profiles/index.ts](src/components/Detergent/data/profiles/index.ts)
- [ ] New ingredients added to [src/components/common/types/Ingredient.ts](src/components/common/types/Ingredient.ts) with categorization
- [ ] `package-lock.json` is **not** modified (no dependency changes should occur)
- [ ] PR is in **draft** state
- [ ] PR description includes:
  - `Closes #<issue_number>` to auto-link and close the issue
  - Source link(s) with date accessed and region
  - List of unknown/ambiguous ingredients
  - Note if enzymes are TBD

Before requesting review:

- [ ] Attempt to resolve all merge conflicts. Do not use high effort.
