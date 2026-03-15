import { Ingredient } from './Ingredient';

const Soaps: Set<Ingredient> = new Set();

Soaps.add(Ingredient.C8_18FattyAcidsSodiumSalt);
Soaps.add(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts);
Soaps.add(Ingredient.OrganicSoapberryJuice);
Soaps.add(Ingredient.PalmKernelAcid);
Soaps.add(Ingredient.PotassiumCocoate);
Soaps.add(Ingredient.SodiumCocoate);
Soaps.add(Ingredient.SodiumOleate);

export { Soaps };
