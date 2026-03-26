import { Ingredient } from './Ingredient';

/**
 * Liquid carriers and humectants that dissolve or disperse other ingredients and
 * constitute the bulk of liquid and gel laundry formula matrices.
 *
 * **Function:** Solvents keep solid and liquid ingredients uniformly distributed,
 * control viscosity, depress the freeze point of liquid products, and in some cases
 * aid in surfactant activity.
 *
 * Note: many of these ingredients (e.g. propylene glycol, glycerin) also act as
 * humectants that reduce moisture loss from the product during storage.
 */
const Solvents: Set<Ingredient> = new Set();

Solvents.add(Ingredient.Alcohol);
Solvents.add(Ingredient.DiethyleneGlycol);
Solvents.add(Ingredient.DipropyleneGlycol);
Solvents.add(Ingredient.Ethanol);
Solvents.add(Ingredient.Glycerin);
Solvents.add(Ingredient.PEG);
Solvents.add(Ingredient.PEG_10);
Solvents.add(Ingredient.Phenylpropanol);
Solvents.add(Ingredient.PPG);
Solvents.add(Ingredient.Propanediol);
Solvents.add(Ingredient.PropyleneGlycol);
Solvents.add(Ingredient.Vinegar);

export { Solvents };
