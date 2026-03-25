import { Ingredient } from './Ingredient';

/**
 * Ingredients that coat synthetic fiber surfaces (primarily polyester) with a hydrophilic film,
 * making soils easier to wash off in subsequent laundry cycles.
 *
 * **Mechanism:** These polymers adsorb onto fiber surfaces during the wash and persist through
 * drying. The coating reduces the inherent hydrophobicity of synthetic fabrics, allowing water
 * to penetrate under oily soils more easily — improving surfactant effectiveness on the next wash.
 *
 * **Not to be confused with soil anti-redeposition agents** (see SoilAntiRedeposition.ts), which
 * operate in the wash solution to keep loosened soil particles suspended. Soil release agents
 * modify the fiber; soil anti-redeposition agents modify the wash water.
 */
const SoilRelease: Set<Ingredient> = new Set();

SoilRelease.add(Ingredient.AnionicModifiedPolyester);
SoilRelease.add(Ingredient.ModifiedStarchPolymer);
SoilRelease.add(Ingredient.NonionicPolyester);
SoilRelease.add(Ingredient.PEGTerephthalatePolymer);
SoilRelease.add(Ingredient.PolypropyleneTerephthalate);

export { SoilRelease };
