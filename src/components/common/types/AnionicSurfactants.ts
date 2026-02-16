import { Ingredient } from './Ingredient';

const AnionicSurfactants: Set<Ingredient> = new Set();

AnionicSurfactants.add(Ingredient.C12_18FattyAcidsSodiumSalt);
AnionicSurfactants.add(Ingredient.SodiumC10_16Alkylbenzenesulfonate);
AnionicSurfactants.add(Ingredient.SodiumLaurethEtherSulfate);
AnionicSurfactants.add(Ingredient.SodiumLaurethSulfate);
AnionicSurfactants.add(Ingredient.SodiumLaurylSulfate);
AnionicSurfactants.add(Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate);
AnionicSurfactants.add(Ingredient.SodiumMEAC12_18FattyAcidsSalt);
AnionicSurfactants.add(Ingredient.SodiumMEALaurethSulfate);

export { AnionicSurfactants };
