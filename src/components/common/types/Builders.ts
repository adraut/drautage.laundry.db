import { Ingredient } from './Ingredient';

/**
 * Alkalinity builders — ingredients whose primary role is raising or buffering the pH of the
 * formula and wash water, enhancing detergent performance by maintaining an alkaline environment
 * that improves surfactant effectiveness and saponifies fatty soils.
 *
 * **Distinct from WaterConditioners** (see WaterConditioners.ts), which sequester or chelate
 * calcium and magnesium ions to soften water. Builders act on pH; water conditioners act on
 * metal ion concentration.
 *
 * Note: `SodiumBicarbonate` also appears in `OdorEliminators` — it neutralizes acidic odor
 * molecules through the same acid-base mechanism by which it buffers wash-water pH.
 * `SodiumCarbonate`, `SodiumSilicate`, and `SodiumMetasilicate` also appear in `WaterConditioners`
 * because they soften water by precipitating Ca²⁺/Mg²⁺ ions in addition to raising pH.
 */
const Builders: Set<Ingredient> = new Set();

Builders.add(Ingredient.Ethanolamine);
Builders.add(Ingredient.LacticAcid);
Builders.add(Ingredient.PotassiumHydroxide);
Builders.add(Ingredient.SodiumBicarbonate);
Builders.add(Ingredient.SodiumCarbonate);
Builders.add(Ingredient.SodiumHydroxide);
Builders.add(Ingredient.SodiumMetasilicate);
Builders.add(Ingredient.SodiumSilicate);
Builders.add(Ingredient.Triethanolamine);
Builders.add(Ingredient.Tromethamine);

export { Builders };
