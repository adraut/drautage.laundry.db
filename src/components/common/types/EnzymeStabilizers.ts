import { Ingredient } from './Ingredient';

/**
 * Enzyme stabilizers are additives that protect hydrolytic enzymes (proteases, amylases,
 * etc.) from degradation or denaturation in liquid detergent formulations. They act as
 * kosmotropic osmolytes or ionic buffers that maintain enzyme tertiary structure during
 * storage and at wash temperatures.
 *
 * Distinct from Enzymes (which perform cleaning) and Preservatives (which prevent microbial
 * growth in the formula). An ingredient may appear in EnzymeStabilizers and another
 * functional category — document any overlap in both set files.
 */
const EnzymeStabilizers: Set<Ingredient> = new Set();

EnzymeStabilizers.add(Ingredient.CalciumFormate);
EnzymeStabilizers.add(Ingredient.SodiumFormate);

export { EnzymeStabilizers };
