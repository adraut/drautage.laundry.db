import { Ingredient } from './Ingredient';

/**
 * Agents that deposit onto or interact with fabric fiber surfaces to improve softness,
 * reduce static electricity, ease ironing, or reduce skin irritation from the laundered item.
 *
 * **Mechanism:** Cationic polymers (polyquaterniums) and clay minerals (bentonite) adsorb
 * onto negatively charged fiber surfaces, imparting a soft, smooth hand feel. Protein-silicone
 * copolymers form a protective film. Botanical extracts (aloe) provide skin-soothing properties.
 *
 * **Distinct from WaterConditioners** (see WaterConditioners.ts): water conditioners modify
 * the wash water by chelating metal ions or adjusting pH; fabric conditioners modify the fiber
 * surface itself.
 *
 * **Warning:** `Polyquaternium7` has a documented staining liability in commercial laundry
 * operations — it can produce non-removable dark stains on certain fabrics. Its presence in a
 * consumer detergent should be noted in the product description.
 */
const FabricConditioners: Set<Ingredient> = new Set();

FabricConditioners.add(Ingredient.AloeBarbadenisLeafPowder);
FabricConditioners.add(Ingredient.Bentonite);
FabricConditioners.add(Ingredient.Cyclotetrasiloxane);
FabricConditioners.add(Ingredient.Polyquaternium7);
FabricConditioners.add(Ingredient.Polyquaternium10);
FabricConditioners.add(Ingredient.QuaternisedHydrolyzedWheatProteinSiliconeCopolymer);
FabricConditioners.add(Ingredient.WheatProteinSilanetriol);

export { FabricConditioners };
