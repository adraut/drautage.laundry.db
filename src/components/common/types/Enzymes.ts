import { Ingredient } from './Ingredient';

const Enzymes: Set<Ingredient> = new Set();

Enzymes.add(Ingredient.Amylase);
Enzymes.add(Ingredient.Cellulase);
Enzymes.add(Ingredient.DNase);
Enzymes.add(Ingredient.Lipase);
Enzymes.add(Ingredient.Mannanase);
Enzymes.add(Ingredient.Pectinase);
Enzymes.add(Ingredient.PectateLyase);
Enzymes.add(Ingredient.Protease);
Enzymes.add(Ingredient.Subtilisin);

export { Enzymes };

const Proteases: Set<Ingredient> = new Set();

Proteases.add(Ingredient.Protease);
Proteases.add(Ingredient.Subtilisin);

export { Proteases };

const Pectinases: Set<Ingredient> = new Set();

Pectinases.add(Ingredient.Pectinase);
Pectinases.add(Ingredient.PectateLyase);

export { Pectinases };
