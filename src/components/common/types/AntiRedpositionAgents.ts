import { Ingredient } from './Ingredient';

/**
 * Ingredients that prevent dye molecules from redepositing onto fabrics during washing.
 *
 * This set covers two complementary mechanisms:
 * - **Fiber-coating agents** (e.g. Cellulose Gum/CMC): adsorb onto fiber surfaces and create a
 *   barrier that repels dye molecules from adhering.
 * - **Dye transfer inhibitors (DTIs)** (e.g. PEI polymers): remain dissolved in wash water and
 *   capture free dye molecules before they can redeposit onto other fabrics.
 *
 * Do NOT add soil anti-redeposition agents here (polymers that keep dirt/mineral particles
 * suspended in wash water). Surfactants already handle soil anti-redeposition. Soil-specific
 * dispersants such as AcrylicAcidHomopolymer, SodiumMaleateAcrylateCopolymer, and
 * SodiumPolyacrylate belong in a separate soil anti-redeposition category if needed.
 */
const AntiRedpositionAgents: Set<Ingredient> = new Set();

AntiRedpositionAgents.add(Ingredient.AnionicModifiedPolyester);
AntiRedpositionAgents.add(Ingredient.CelluloseGum);
AntiRedpositionAgents.add(Ingredient.PolyethlyleneImineEthoxylate);
AntiRedpositionAgents.add(Ingredient.PolyethyleneimineAlkoxylated);
AntiRedpositionAgents.add(Ingredient.PolyethyleniminePolymer);

export { AntiRedpositionAgents };
