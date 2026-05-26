import { Ingredient } from './Ingredient';
import { IngredientContextRule } from './IngredientContextRule';
import { FoamingSurfactants } from './FoamingSurfactants';
import { Surfactants } from './Surfactants';

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
     * It is a suds reducer when a foaming surfactant (sulfate, sulfonate, or ether
     * sulfate) precedes it with at least one non-surfactant ingredient as a gap
     * (indicating lower concentration). If it sits immediately adjacent to a
     * surfactant, or only non-foaming surfactants precede it, it remains a soap.
     */
    ingredient: Ingredient.C8_18FattyAcidsSodiumSalt,
    condition: (ingredients, _type) => {
      const fattyIdx = ingredients.indexOf(Ingredient.C8_18FattyAcidsSodiumSalt);
      return (
        fattyIdx > 0 &&
        !Surfactants.has(ingredients[fattyIdx - 1]) &&
        ingredients.slice(0, fattyIdx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    /**
     * Free fatty acids (CoconutFattyAcid, LauricAcid, PalmKernelAcid,
     * FattyAcidC8_18AndC18Unsaturated) are thermodynamically 100% deprotonated
     * at laundry wash-water pH (≥8), so they always technically co-surf as soap.
     * They shift to suds suppressors when a foaming surfactant (sulfate, sulfonate,
     * or ether sulfate) precedes them with a non-surfactant gap (indicating a lower
     * concentration). If they sit immediately adjacent to a surfactant, or only
     * non-foaming surfactants precede them, the rule leaves them correctly as Soap.
     */
    ingredient: Ingredient.CoconutFattyAcid,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.CoconutFattyAcid);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.FattyAcidC8_18AndC18Unsaturated,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.FattyAcidC8_18AndC18Unsaturated);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.LauricAcid,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.LauricAcid);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.PalmKernelAcid,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.PalmKernelAcid);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
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
  {
    ingredient: Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.C12_18FattyAcidsSodiumSalt,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.C12_18FattyAcidsSodiumSalt);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.MEAC12_18FattyAcidsSalt,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.MEAC12_18FattyAcidsSalt);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.MEACocoate,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.MEACocoate);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.PotassiumCocoate,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.PotassiumCocoate);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.SodiumCocoate,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.SodiumCocoate);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
  {
    ingredient: Ingredient.SodiumOleate,
    condition: (ingredients, _type) => {
      const idx = ingredients.indexOf(Ingredient.SodiumOleate);
      return (
        idx > 0 &&
        !Surfactants.has(ingredients[idx - 1]) &&
        ingredients.slice(0, idx).some((ing) => FoamingSurfactants.has(ing))
      );
    },
    excludeFromCategories: ['Soap'],
  },
];
