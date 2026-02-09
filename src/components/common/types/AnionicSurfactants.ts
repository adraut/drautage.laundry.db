import { Ingredient } from "./Ingredient";

const AnionicSurfactants: Set<Ingredient> = new Set();

AnionicSurfactants.add(Ingredient.C12_18FattyAcidsSodiumSalt);
AnionicSurfactants.add(Ingredient.SodiumC10_16Alkylbenzenesulfonate);
AnionicSurfactants.add(Ingredient.SodiumLaurethEtherSulfate);
AnionicSurfactants.add(Ingredient.SodiumLaurethSulfate);
AnionicSurfactants.add(Ingredient.SodiumLaurylSulfate);

export { AnionicSurfactants };
