import { Ingredient } from './Ingredient';

/**
 * Rheology modifiers that increase product viscosity or create gel structure in liquid
 * laundry formulas.
 *
 * **Types included:**
 * - *Polysaccharide gums* (xanthan, guar, gum acacia) — biopolymer thickeners that form
 *   hydrogen-bond networks in water.
 * - *Ionic thickener salts* (NaCl, KCl, MgCl₂, CaCl₂) — used at low concentrations to
 *   increase viscosity of surfactant micelle solutions via electrostatic effects. At higher
 *   concentrations these same salts thin the product, so their thickening role is
 *   concentration-dependent.
 * - *Wax-based structurants* (hydrogenated castor oil) — form a physical gel network that
 *   suspends particles and controls pour consistency.
 */
const Thickeners: Set<Ingredient> = new Set();

Thickeners.add(Ingredient.CalciumChloride);
Thickeners.add(Ingredient.GuarGum);
Thickeners.add(Ingredient.GumAcacia);
Thickeners.add(Ingredient.HydrogenatedCastorOil);
Thickeners.add(Ingredient.MagnesiumChloride);
Thickeners.add(Ingredient.Polysaccharides);
Thickeners.add(Ingredient.PotassiumChloride);
Thickeners.add(Ingredient.SodiumChloride);
Thickeners.add(Ingredient.XanthanGum);

export { Thickeners };
