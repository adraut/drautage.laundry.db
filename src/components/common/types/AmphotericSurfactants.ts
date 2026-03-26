import { Ingredient } from './Ingredient';

/**
 * Amphoteric (zwitterionic) surfactants — molecules that carry both a positive and a negative
 * charge depending on pH. In the neutral-to-alkaline pH of laundry wash water they behave as
 * mildly anionic surfactants, providing cleaning action with lower irritation potential than
 * purely anionic surfactants.
 *
 * Commonly combined with anionic or nonionic surfactants for mildness and foam stability.
 *
 * **Not to be confused with anionic surfactants** (see AnionicSurfactants.ts), which carry a
 * permanent negative charge, or nonionic surfactants (see NonionicSurfactants.ts), which carry
 * no net charge.
 */
const AmphotericSurfactants: Set<Ingredient> = new Set();

AmphotericSurfactants.add(Ingredient.CocamidopropylBetaine);
AmphotericSurfactants.add(Ingredient.SodiumCocoamphopropionate);

export { AmphotericSurfactants };
