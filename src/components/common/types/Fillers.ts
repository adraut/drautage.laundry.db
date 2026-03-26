import { Ingredient } from './Ingredient';

/**
 * Inert or low-activity ingredients used primarily as bulking agents, flow aids, or
 * anticaking agents. These ingredients contribute little or nothing to direct cleaning
 * performance; their role is to give the product its physical form, improve powder
 * flowability, or reduce cost per dose.
 *
 * Note: `SaltCake` is the industrial/bulk name for sodium sulfate and is the same substance
 * as `SodiumSulfate`. Both are included here because different products may list either name.
 */
const Fillers: Set<Ingredient> = new Set();

Fillers.add(Ingredient.CalciumCarbonate);
Fillers.add(Ingredient.HydratedSilica);
Fillers.add(Ingredient.PEG136PolyvinylAlcohol);
Fillers.add(Ingredient.SaltCake);
Fillers.add(Ingredient.Silica);
Fillers.add(Ingredient.SodiumSulfate);

export { Fillers };
