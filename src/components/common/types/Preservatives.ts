import { Ingredient } from './Ingredient';

const Preservatives: Set<Ingredient> = new Set();

Preservatives.add(Ingredient.Benzisothiazolinone);
Preservatives.add(Ingredient.BHT);
Preservatives.add(Ingredient.Methylisothiazolinone);

export { Preservatives };
