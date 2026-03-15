import { Ingredient } from './Ingredient';

const Preservatives: Set<Ingredient> = new Set();

Preservatives.add(Ingredient.Benzisothiazolinone);
Preservatives.add(Ingredient.BHT);
Preservatives.add(Ingredient.LoniceraJaponicaFlowerExtract);
Preservatives.add(Ingredient.Methylchloroisothiazolinone);
Preservatives.add(Ingredient.Methylisothiazolinone);
Preservatives.add(Ingredient.Phenoxyethanol);

export { Preservatives };
