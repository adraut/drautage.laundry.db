import { Ingredient } from './Ingredient';

const SudsReducers: Set<Ingredient> = new Set();

SudsReducers.add(Ingredient.C8_18FattyAcidsSodiumSalt);
SudsReducers.add(Ingredient.Dimethicone);
SudsReducers.add(Ingredient.PhenylpropylEthylMethicone);
SudsReducers.add(Ingredient.Simethicone);
SudsReducers.add(Ingredient.SimethiconeDimethicone);
SudsReducers.add(Ingredient.Trimethylsiloxysilicate);

export { SudsReducers };
