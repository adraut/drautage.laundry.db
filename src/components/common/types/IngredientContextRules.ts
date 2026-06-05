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
export const IngredientContextRules: IngredientContextRule[] = [];
