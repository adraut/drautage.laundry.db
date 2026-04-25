import { Ingredient } from './Ingredient';

/**
 * Ingredients that are sulfate compounds — i.e. they contain the sulfate (SO₄²⁻) or ester-sulfate
 * (-OSO₃⁻) group. Includes both functional surfactant sulfates (SLS, SLES, alkyl ether sulfates)
 * and non-surfactant inorganic sulfates used as fillers (sodium sulfate).
 *
 * Do **not** add sulfonates (-SO₃⁻ direct C-S bond, e.g. alkylbenzene sulfonates, LAS) or
 * carboxylate/fatty-acid salts here — they are chemically distinct from sulfates.
 */
const Sulfates: Set<Ingredient> = new Set();

Sulfates.add(Ingredient.MEAC12_15AlkylEtherSulfate);
Sulfates.add(Ingredient.MEALaurethSulfate);
Sulfates.add(Ingredient.SodiumLaurethSulfate);
Sulfates.add(Ingredient.SodiumLaurylSulfate);
Sulfates.add(Ingredient.SodiumMEALaurethSulfate);
Sulfates.add(Ingredient.SodiumMEALaurylSulfate);
Sulfates.add(Ingredient.SodiumSulfate);

export { Sulfates };
