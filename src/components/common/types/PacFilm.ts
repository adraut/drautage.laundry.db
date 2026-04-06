import { Ingredient } from './Ingredient';

/**
 * Water-soluble polymer film used exclusively to encase unit-dose laundry pods (pacs).
 * The film dissolves rapidly on contact with wash water, releasing the enclosed detergent
 * concentrate at the start of the wash cycle.
 *
 * **Primary polymer:** Polyvinyl alcohol (PVOH/PVA) — a synthetic polymer that forms
 * strong, flexible films and dissolves cleanly in water without leaving residue on fabrics.
 *
 * These ingredients contribute no cleaning, conditioning, or fragrance function; their
 * sole role is dosing-container dissolution.
 */
const PacFilm: Set<Ingredient> = new Set();

PacFilm.add(Ingredient.PEG136PolyvinylAlcohol);
PacFilm.add(Ingredient.PolyvinylAlcohol);
PacFilm.add(Ingredient.PolyvinylAlcoholFilm);
PacFilm.add(Ingredient.PolyvinylAlcoholPolymer);

export { PacFilm };
