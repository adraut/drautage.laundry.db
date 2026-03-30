import { Ingredient } from './Ingredient';

const ProcessingAids: Set<Ingredient> = new Set();

ProcessingAids.add(Ingredient.C16_18FattyAcidsSodiumSalt);
ProcessingAids.add(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts);

export { ProcessingAids };
