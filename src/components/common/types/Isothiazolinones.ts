import { Ingredient } from './Ingredient';

/**
 * Isothiazolinone preservatives (MIT, CMIT, BIT), a well-documented family of skin sensitizers
 * and common causes of allergic contact dermatitis. Used for the grid's isothiazolinone flag so
 * that users can exclude them without also excluding non-sensitizing preservatives (e.g. potassium
 * sorbate).
 *
 * Every ingredient here is also in `Preservatives`. This set is a filter-only subset and is not
 * registered in `IngredientCategoryMap`, so ingredient chips still show "Preservative".
 */
const Isothiazolinones: Set<Ingredient> = new Set();

// Alphabetical by enum key name
Isothiazolinones.add(Ingredient.Benzisothiazolinone);
Isothiazolinones.add(Ingredient.Methylchloroisothiazolinone);
Isothiazolinones.add(Ingredient.Methylisothiazolinone);

export { Isothiazolinones };
