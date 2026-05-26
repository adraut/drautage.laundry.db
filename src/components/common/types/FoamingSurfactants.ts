import { Ingredient } from './Ingredient';

/**
 * Surfactants that generate significant foam in wash water.
 *
 * Includes sulfates, ether sulfates, sulfonates, and methyl ester sulfonates.
 * Does not include nonionic surfactants (inherently low-foam), amphoteric
 * surfactants (foam stabilizers, not generators), or soap-based anionics
 * (fatty acid salts, which are classified separately under Soaps).
 *
 * Used in context rules to determine whether a soap ingredient appearing later
 * in an ingredient list is acting as a suds reducer: a foaming surfactant must
 * precede it (with a non-surfactant gap) for the suds-reducer interpretation
 * to apply. Without a foaming surfactant, there is no significant foam to
 * suppress, so the soap is more likely a co-cleaner or processing aid.
 */
const FoamingSurfactants: Set<Ingredient> = new Set();

// Alkyl sulfates
FoamingSurfactants.add(Ingredient.SodiumLaurylSulfate);
FoamingSurfactants.add(Ingredient.SodiumMEALaurylSulfate);

// Alkyl ether sulfates
FoamingSurfactants.add(Ingredient.MEAC12_15AlkylEtherSulfate);
FoamingSurfactants.add(Ingredient.MEALaurethSulfate);
FoamingSurfactants.add(Ingredient.SodiumLaurethSulfate);
FoamingSurfactants.add(Ingredient.SodiumMEALaurethSulfate);

// Alkylbenzenesulfonates and linear alkylbenzene sulfonates (LAS)
FoamingSurfactants.add(Ingredient.DodecylbenzeneSulfonicAcid);
FoamingSurfactants.add(Ingredient.LinearAlkylbenzeneSulfonicAcid);
FoamingSurfactants.add(Ingredient.MEAC10_16Alkylbenzenesulfonate);
FoamingSurfactants.add(Ingredient.MEADedecylbenzenesulfonate);
FoamingSurfactants.add(Ingredient.MEALAS);
FoamingSurfactants.add(Ingredient.SodiumC10_16Alkylbenzenesulfonate);
FoamingSurfactants.add(Ingredient.SodiumDodecylbenzenesulfonate);
FoamingSurfactants.add(Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate);
FoamingSurfactants.add(Ingredient.SodiumMEALinearAlkylbenzene);

// Methyl ester sulfonates (moderate foam)
FoamingSurfactants.add(Ingredient.SodiumMethyl2Sulfolaurate);
FoamingSurfactants.add(Ingredient.SodiumMethyl2Sulphooctadecanoate);

export { FoamingSurfactants };
