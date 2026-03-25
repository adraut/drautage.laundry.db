# Add Ingredient Category

Adds a new ingredient category set to the repository, wires it into `DetergentProfile`,
exposes it as a grid column and filter, and adds tests.

## Usage

/add-ingredient-category <CategoryName> "<Human Readable Title>"

Examples:

- `/add-ingredient-category Builders "Builders"`
- `/add-ingredient-category WaterSofteners "Water Softeners"`

## Steps

1. **Read the AGENTS.md** for ingredient category conventions:

   ```
   src/components/common/types/AGENTS.md
   ```

2. **Create the category set file** at
   `src/components/common/types/<CategoryName>.ts`:
   - Import `Ingredient` from `'./Ingredient'`
   - Declare `const <CategoryName>: Set<Ingredient> = new Set();`
   - Add ingredients in **alphabetical order by enum key**
   - Write a JSDoc comment explaining the category's mechanism and any
     important distinctions from related categories
   - Export the set: `export { <CategoryName> };`

3. **Update `DetergentProfile`** at
   `src/components/Detergent/types/DetergentProfile.ts`:

   a. Add import (keep imports alphabetical):

   ```ts
   import { <CategoryName> } from '../../common/types/<CategoryName>';
   ```

   b. Add readonly field declaration (place it logically near related fields):

   ```ts
   readonly has<CategoryName>: boolean;
   ```

   c. Add computation in the constructor body:

   ```ts
   this.has<CategoryName> = ingredients.some((ing) => <CategoryName>.has(ing));
   ```

4. **Add grid column** in `src/components/Detergent/Detergents.tsx`:

   In `COLUMN_DEFS`, add a boolean column in a logical position near related columns:

   ```ts
   { field: 'has<CategoryName>', headerName: '<Human Readable Title>', ...BOOLEAN_COL },
   ```

5. **Add filter field** in `src/components/Detergent/Detergents.tsx`:

   In `FILTER_FIELDS`, add a matching entry in the **same position** as the column above
   (filter order should mirror column order):

   ```ts
   { field: 'has<CategoryName>', title: '<Human Readable Title>', type: 'boolean' as const },
   ```

6. **Register in `IngredientCategoryMap`** at
   `src/components/common/types/IngredientCategoryMap.ts`:

   a. Add import (keep imports alphabetical):

   ```ts
   import { <CategoryName> } from './<CategoryName>';
   ```

   b. Add an entry to `CATEGORY_SETS`:

   ```ts
   [<CategoryName>, '<Human Readable Title>'],
   ```

   c. Add an entry to the `displayCategories` array in
   `src/components/Detergent/__tests__/IngredientCategoryMap.test.ts`:

   ```ts
   [<CategoryName>, '<Human Readable Title>'],
   ```

   Also add the corresponding import at the top of that test file.

7. **Update `src/components/common/types/AGENTS.md`**:

   Add `<CategoryName>` to the category set list and add a bullet explaining
   what belongs in it and any important exclusions.

8. **Add tests** in
   `src/components/Detergent/__tests__/DetergentProfile.test.ts`,
   in the `'additive detection properties'` describe block:

   ```ts
   it('should detect has<CategoryName> when a <category> ingredient is present', () => {
     const profile = new DetergentProfile(
       'Test', 'Brand', DetergentType.Liquid, DataSource.Package,
       [Ingredient.<RepresentativeIngredient>], new Date(),
     );
     expect(profile.has<CategoryName>).toBe(true);
   });

   it('should not detect has<CategoryName> when no <category> ingredients are present', () => {
     const profile = new DetergentProfile(
       'Test', 'Brand', DetergentType.Liquid, DataSource.Package,
       [Ingredient.Water], new Date(),
     );
     expect(profile.has<CategoryName>).toBe(false);
   });
   ```

9. **Run quality checks** and fix any failures:

   ```
   npm run checks
   ```

## Notes

- Filter field order in `FILTER_FIELDS` should match column order in `COLUMN_DEFS`.
- An ingredient may belong to more than one category set — document the overlap
  in both set files' JSDoc comments.
- Only add ingredients whose membership is scientifically established, not inferred.
