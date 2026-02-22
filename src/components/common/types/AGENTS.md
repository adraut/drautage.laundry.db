# AGENTS.md (Ingredient Types)

Purpose: instructions for maintaining ingredient enums and category sets.

## Scope

These instructions apply to [src/components/common/types](src/components/common/types).

## Ingredient enum updates

- Add new ingredients to [Ingredient.ts](Ingredient.ts) only when explicitly listed in authoritative sources.
- Use a human‑readable enum value string that matches the source text.
- **Never assume a spelling variation in an ingredient name is a typo.** Only map to an existing enum entry if it is a confirmed synonym.
- If an ingredient has a confirmed synonym already in the enum, add or update a comment on the enum entry listing the synonym (e.g., `Fragrance = 'Fragrance', // also listed as: Long Lasting Fragrance`).
- Do **not** add placeholder/unknown ingredients.
- Do keep ingredients in alphabetical order.

## Category sets

When adding a new ingredient, decide if it belongs in any of these sets (non‑exhaustive):

- Enzymes, Proteases, OpticalBrighteners
- AnionicSurfactants, NonionicSurfactants, Soaps, Scents, Dyes
- OxygenBleaches, SudsReducers, WaterConditioners
- Preservatives, AntiRedpositionAgents, NonBiodegradable, SepticUnfriendly, OdorEliminators

Update the appropriate set file(s) so `DetergentProfile` derived flags remain accurate. Only place an ingredient into a category if the source explicitly indicates it.

## Ambiguity rules

- Generic surfactant terms stay generic; do not map to specific laureth or alketh variants without explicit source confirmation.
- If the source lists “enzymes” generically, do not add specific enzymes to the enum; note enzymes as TBD in the PR.
- If uncertain, add the profile with generic ingredients and list unknowns in the PR (draft).
