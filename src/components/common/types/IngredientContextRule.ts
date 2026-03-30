import { Ingredient } from './Ingredient';
import { DetergentType } from '../../Detergent/types/DetergentType';

export type IngredientContextRule = {
  /** The ingredient this rule applies to. */
  ingredient: Ingredient;
  /**
   * Returns true when the ingredient's default categories should be partially
   * overridden. Receives the full ordered ingredient list and the detergent type
   * so that position-based (concentration-proxy) and format-based logic can be expressed.
   */
  condition: (ingredients: Ingredient[], type: DetergentType) => boolean;
  /** Categories to remove from this ingredient's display and flag evaluation when the condition is met. */
  excludeFromCategories: string[];
};
