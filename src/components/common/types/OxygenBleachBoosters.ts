import { Ingredient } from './Ingredient';

/**
 * Bleach activators that enhance the effectiveness of oxygen-bleach systems but are not
 * oxidizing agents themselves.
 *
 * **Mechanism:** These acyl-donor compounds react with hydrogen peroxide released by sodium
 * percarbonate (see OxygenBleaches.ts) to form peracid species (e.g. peracetic acid from TAED),
 * which bleach stains effectively at lower wash temperatures (30–40 °C) where unactivated
 * H₂O₂ alone is too slow.
 *
 * **Not the same as oxygen bleaches:** An oxygen bleach booster will not bleach without a
 * peroxide source present — it is an activator, not an oxidant.
 */
const OxygenBleachBoosters: Set<Ingredient> = new Set();

OxygenBleachBoosters.add(Ingredient.TAED);

export { OxygenBleachBoosters };
