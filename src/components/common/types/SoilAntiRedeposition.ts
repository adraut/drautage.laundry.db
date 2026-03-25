import { Ingredient } from './Ingredient';

/**
 * Ingredients that keep loosened soil and mineral particles suspended in wash water,
 * preventing them from redepositing onto fabric surfaces during washing.
 *
 * **Not to be confused with soil release agents** (e.g. AnionicModifiedPolyester,
 * PEGTerephthalatePolymer, PolypropyleneTerephthalate), which coat fiber surfaces to help
 * soils wash off more easily. Soil anti-redeposition agents operate in the wash solution,
 * not on the fabric.
 *
 * Some ingredients appear in both this set and DyeTransferInhibitors — this is intentional.
 * For example, CelluloseGum coats cotton fibers to repel both soil particles and dye molecules,
 * and PolyethyleneimineAlkoxylated primarily prevents soil redeposition but also captures dye
 * molecules via cationic bonding sites.
 */
const SoilAntiRedeposition: Set<Ingredient> = new Set();

SoilAntiRedeposition.add(Ingredient.AcrylicAcidHomopolymer);
SoilAntiRedeposition.add(Ingredient.CelluloseGum);
SoilAntiRedeposition.add(Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer);
SoilAntiRedeposition.add(Ingredient.ModifiedAcrylicCopolymer);
SoilAntiRedeposition.add(Ingredient.PolyethyleneimineAlkoxylated);
SoilAntiRedeposition.add(Ingredient.PolyethlyleneImineEthoxylate);
SoilAntiRedeposition.add(Ingredient.SodiumAcrylicAcidMACopolymer);
SoilAntiRedeposition.add(Ingredient.SodiumCarboxymethylInulin);
SoilAntiRedeposition.add(Ingredient.SodiumMaleateAcrylateCopolymer);
SoilAntiRedeposition.add(Ingredient.SodiumPolyacrylate);
SoilAntiRedeposition.add(Ingredient.SodiumPolyitaconate);

export { SoilAntiRedeposition };
