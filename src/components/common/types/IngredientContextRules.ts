import { Ingredient } from './Ingredient';
import { IngredientContextRule } from './IngredientContextRule';
import { AnionicSurfactants } from './AnionicSurfactants';
import { DetergentType } from '../../Detergent/types/DetergentType';

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
    condition: (ingredients, _type) => {
      const polyIdx = ingredients.indexOf(Ingredient.SodiumPolyacrylate);
      const fattyIdx = ingredients.indexOf(Ingredient.C16_18FattyAcidsSodiumSalt);
      return polyIdx !== -1 && polyIdx < fattyIdx;
    },
    excludeFromCategories: ['Soap'],
  },
  {
    /**
     * C8-18 fatty acid sodium salt appears in both Soaps and SudsReducers.
     * When a primary synthetic anionic surfactant (LAS, laureth sulfate, etc.)
     * appears earlier in the list (higher concentration), the fatty acid salt's
     * role shifts from active soap surfactant to suds suppressor: the synthetic
     * surfactant generates foam that the fatty acid salt then dampens, which is
     * a well-established mechanism in HE powder and liquid formulations.
     */
    ingredient: Ingredient.C8_18FattyAcidsSodiumSalt,
    condition: (ingredients, type) => {
      if (type !== DetergentType.Powder) return false;
      const fattyIdx = ingredients.indexOf(Ingredient.C8_18FattyAcidsSodiumSalt);
      return ingredients.slice(0, fattyIdx).some((ing) => AnionicSurfactants.has(ing));
    },
    excludeFromCategories: ['Soap'],
  },
  {
    /**
     * Free fatty acids (CoconutFattyAcid, LauricAcid, PalmKernelAcid,
     * FattyAcidC8_18AndC18Unsaturated) are thermodynamically 100% deprotonated
     * at laundry wash-water pH (≥8), so they always technically co-surf as soap.
     * However, when a synthetic anionic surfactant precedes them in the list
     * (higher concentration), their formulation intent is suds suppression via
     * insoluble calcium fatty acid particle formation — not cleaning. The anionic
     * surfactant handles primary cleaning and generates foam; the fatty acid damps
     * that foam. This is the standard HE-formula mechanism. In a soap-primary
     * formula with no synthetic anionic, the rule correctly leaves them as Soap.
     */
    ingredient: Ingredient.CoconutFattyAcid,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.CoconutFattyAcid);
      return ingredients.slice(0, idx).some((ing) => AnionicSurfactants.has(ing));
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.FattyAcidC8_18AndC18Unsaturated,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.FattyAcidC8_18AndC18Unsaturated);
      return ingredients.slice(0, idx).some((ing) => AnionicSurfactants.has(ing));
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.LauricAcid,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.LauricAcid);
      return ingredients.slice(0, idx).some((ing) => AnionicSurfactants.has(ing));
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.PalmKernelAcid,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.PalmKernelAcid);
      return ingredients.slice(0, idx).some((ing) => AnionicSurfactants.has(ing));
    },
    excludeFromCategories: ['Soap'],
  },
  {
    /**
     * C8-18 unsaturated fatty acid sodium salts (oleate/linoleate family) behave
     * identically to C16_18FattyAcidsSodiumSalt in powder detergent manufacturing:
     * they function as granule binders and flow aids when SodiumPolyacrylate is
     * present at higher concentration, which signals a modern anti-redeposition
     * polymer system rather than a soap-primary formulation.
     */
    ingredient: Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
    condition: (ingredients, _type) => {
      const polyIdx = ingredients.indexOf(Ingredient.SodiumPolyacrylate);
      const fattyIdx = ingredients.indexOf(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts);
      return polyIdx !== -1 && polyIdx < fattyIdx;
    },
    excludeFromCategories: ['Soap'],
  },
];
