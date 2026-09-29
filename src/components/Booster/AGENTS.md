# AGENTS.md (Booster)

Purpose: instructions for adding or updating a laundry booster profile (e.g. oxygen, enzyme, or odor boosters added alongside detergent).

## Scope

These instructions apply to booster profiles under [src/components/Booster](.). Boosters share all ingredient, grid, and compare behavior with detergents via [common/product](../common/product).

## Rules

Follow [../Detergent/AGENTS.md](../Detergent/AGENTS.md) for required inputs, valid sources, and **all ingredient rules** — they apply to boosters unchanged. Only the differences are listed here.

## Add a new booster profile

1. Create a new profile file in [data/profiles](data/profiles) named `<brand>-<product>-<variant>.ts` (lowercase, hyphenated).
2. Construct a `BoosterProfile` ([types/BoosterProfile.ts](types/BoosterProfile.ts)) — same constructor arguments as `DetergentProfile`:

   ```ts
   import { Ingredient } from '../../../common/types/Ingredient';
   import { BoosterProfile } from '../../types/BoosterProfile';
   import { ProductType } from '../../../common/product/types/ProductType';
   import { DataSource } from '../../../common/product/types/DataSource';

   const ingredients: Ingredient[] = [/* ... */];

   const BrandProduct: BoosterProfile = new BoosterProfile(
     'Product',
     'Brand',
     ProductType.Powder,
     DataSource.Package,
     ingredients,
     new Date('YYYY-MM-DD'), // date accessed from the issue
   );

   export default BrandProduct;
   ```

3. Export the profile in [data/profiles/index.ts](data/profiles/index.ts) in alphabetical order (replace the placeholder `export {};` when adding the first profile).
4. Populate `countryOfOrigin` / `countriesAvailable` when available.

## Pull request requirements

- Open a **draft PR** using the `.github/PULL_REQUEST_TEMPLATE/booster.md` template.
- Do **not** modify `package-lock.json`.
