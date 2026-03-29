import { Ingredient } from './Ingredient';
import { IngredientContextRule } from './IngredientContextRule';

/**
 * Global context rules that adjust ingredient category membership based on
 * the composition and ordering of the ingredient list.
 *
 * Ingredient lists follow label-order convention (highest concentration first),
 * so relative position is a reliable proxy for functional role when two
 * ingredients are co-present.
 *
 * Rules are evaluated at DetergentProfile construction time. Each matching rule
 * contributes exclusions to effectiveCategoryExclusions; profile-level
 * categoryExclusions are merged on top with higher priority.
 */
export const IngredientContextRules: IngredientContextRule[] = [
  {
    /**
     * C16-18 fatty acid sodium salts are classical soaps, but in modern synthetic
     * detergent powder formulations they commonly function as processing/binder
     * aids (granule agglomeration, flow improvement) rather than as primary
     * surfactants. The presence of a high-concentration dispersing polymer such
     * as SodiumPolyacrylate earlier in the list (higher concentration) signals
     * this secondary role: the polymer handles hard-water mineral management,
     * leaving the fatty acid salt with no meaningful surfactant function.
     */
    ingredient: Ingredient.C16_18FattyAcidsSodiumSalt,
    condition: (ingredients) => {
      const polyIdx = ingredients.indexOf(Ingredient.SodiumPolyacrylate);
      const fattyIdx = ingredients.indexOf(Ingredient.C16_18FattyAcidsSodiumSalt);
      return polyIdx !== -1 && polyIdx < fattyIdx;
    },
    excludeFromCategories: ['Soap'],
  },
];
