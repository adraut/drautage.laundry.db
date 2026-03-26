import { Ingredient } from './Ingredient';

/**
 * Safety additives included at trace concentrations (parts per million) to make the product
 * unpalatable and deter accidental ingestion, especially by children who might mistake
 * brightly colored or fragrant detergent pods for food or candy.
 *
 * These ingredients contribute nothing to cleaning performance.
 */
const BitteringAgents: Set<Ingredient> = new Set();

BitteringAgents.add(Ingredient.DenatoniumBenzoate);

export { BitteringAgents };
