import { Ingredient } from './Ingredient';

const Enzymes: Set<Ingredient> = new Set();

Enzymes.add(Ingredient.AlphaAmylase);
Enzymes.add(Ingredient.AlphaCellulase);
Enzymes.add(Ingredient.Amylase);
Enzymes.add(Ingredient.Cellulase);
Enzymes.add(Ingredient.DNase);
Enzymes.add(Ingredient.Lipase);
Enzymes.add(Ingredient.Mannanase);
Enzymes.add(Ingredient.PectateLyase);
Enzymes.add(Ingredient.Pectinase);
Enzymes.add(Ingredient.Protease);
Enzymes.add(Ingredient.Subtilisin);

export { Enzymes };

const Amylases: Set<Ingredient> = new Set();

Amylases.add(Ingredient.AlphaAmylase);
Amylases.add(Ingredient.Amylase);

export { Amylases };

const Cellulases: Set<Ingredient> = new Set();

Cellulases.add(Ingredient.AlphaCellulase);
Cellulases.add(Ingredient.Cellulase);

export { Cellulases };

const Proteases: Set<Ingredient> = new Set();

Proteases.add(Ingredient.Protease);
Proteases.add(Ingredient.Subtilisin);

export { Proteases };

const Pectinases: Set<Ingredient> = new Set();

Pectinases.add(Ingredient.Pectinase);
Pectinases.add(Ingredient.PectateLyase);

export { Pectinases };
