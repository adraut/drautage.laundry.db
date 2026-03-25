import { Ingredient } from './Ingredient';

/**
 * Ingredients that prevent dye molecules from redepositing onto fabrics during washing.
 *
 * This set covers two complementary mechanisms:
 * - **Fiber-coating agents** (e.g. Cellulose Gum/CMC): adsorb onto fiber surfaces and create a
 *   barrier that repels dye molecules from adhering.
 * - **Dye transfer inhibitors (DTIs)** (e.g. PEI polymers): remain dissolved in wash water and
 *   capture free dye molecules before they can redeposit onto other fabrics. PEI-type polymers
 *   act via cationic bonding sites that bind anionic dye molecules.
 *
 * Some ingredients also appear in SoilAntiRedeposition — this is intentional. CelluloseGum
 * repels both soil particles and dye molecules from fiber surfaces. PolyethyleneimineAlkoxylated
 * primarily targets soil redeposition but provides secondary dye transfer inhibition.
 *
 * Do NOT add purely soil anti-redeposition agents here (e.g. AcrylicAcidHomopolymer,
 * SodiumMaleateAcrylateCopolymer, SodiumPolyacrylate — see SoilAntiRedeposition.ts).
 *
 * Note: Dedicated vinylpyrrolidone/vinylimidazole copolymer DTIs (PVP, PVNO, VP/VI copolymers)
 * are the primary commercial dye-capture polymers but are not yet in the Ingredient enum.
 * Add them here when first encountered in product data.
 */
const DyeTransferInhibitors: Set<Ingredient> = new Set();

DyeTransferInhibitors.add(Ingredient.AnionicModifiedPolyester);
DyeTransferInhibitors.add(Ingredient.CelluloseGum);
DyeTransferInhibitors.add(Ingredient.PolyethyleneimineAlkoxylated);
DyeTransferInhibitors.add(Ingredient.PolyethlyleneImineEthoxylate);
DyeTransferInhibitors.add(Ingredient.PolyethyleniminePolymer);

export { DyeTransferInhibitors };
