import { Ingredient } from './Ingredient';

export type IngredientContextRule = {
  /** The ingredient this rule applies to. */
  ingredient: Ingredient;
  /**
   * Returns true when the ingredient's default categories should be partially
   * overridden. Receives the full ordered ingredient list for the product so
   * that position-based (concentration-proxy) logic can be expressed.
   */
  condition: (ingredients: Ingredient[]) => boolean;
  /** Categories to remove from this ingredient's display and flag evaluation when the condition is met. */
  excludeFromCategories: string[];
};
