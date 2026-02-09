import { Ingredient } from "./Ingredient";

const NonionicSurfactants: Set<Ingredient> = new Set();

NonionicSurfactants.add(Ingredient.C10_16Alketh);
NonionicSurfactants.add(Ingredient.C10_16AlkyldimethylamineOxide);
NonionicSurfactants.add(Ingredient.C12_15AlcoholsEthoxylated);
NonionicSurfactants.add(Ingredient.Laureth_7);
NonionicSurfactants.add(Ingredient.LaurylGlucoside);

export { NonionicSurfactants };
