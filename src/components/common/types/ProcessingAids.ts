import { Ingredient } from './Ingredient';

const ProcessingAids: Set<Ingredient> = new Set();

ProcessingAids.add(Ingredient.C16_18FattyAcidsSodiumSalt);
ProcessingAids.add(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts);
ProcessingAids.add(Ingredient.HydratedSilica);

export { ProcessingAids };
