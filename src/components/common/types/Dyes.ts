import { Ingredient } from './Ingredient';

const Dyes: Set<Ingredient> = new Set();

Dyes.add(Ingredient.PigmentBlue15);
Dyes.add(Ingredient.PigmentRed5);
Dyes.add(Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue);
Dyes.add(Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan);
Dyes.add(Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet);
Dyes.add(Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow);

export { Dyes };
