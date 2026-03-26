# AGENTS.md (Ingredient Types)

Purpose: instructions for maintaining ingredient enums and category sets.

## Scope

These instructions apply to [src/components/common/types](src/components/common/types).

## Ingredient enum updates

- Add new ingredients to [Ingredient.ts](Ingredient.ts) only when explicitly listed in authoritative sources.
- Use a human‑readable enum value string that matches the source text.
- **Never assume a spelling variation in an ingredient name is a typo.** Only map to an existing enum entry if it is a confirmed synonym.
- A **synonym** is an alternate name for the exact same substance. A more specific ingredient that belongs to a broader group is **not** a synonym — add it as a new entry.
- If a more common name exists for an existing ingredient, replace the enum value string with the more common name.
- If an ingredient has a confirmed synonym already in the enum, add or update a JSDoc comment on the enum entry listing the synonym. For example:
  ```ts
  /**
   * Synonyms: Amylase enzyme
   **/
  Amylase = 'Amylase',
  ```
- When adding a new ingredient, add a JSDoc comment describing its function and any known synonyms.
- Do **not** add placeholder/unknown ingredients.
- Do keep ingredients in alphabetical order.

## Category sets

When adding a new ingredient to a category set file, insert it in **alphabetical order by enum key name**. Do not append it at the end.

When adding a new ingredient, decide if it belongs in any of these sets (non‑exhaustive):

- Enzymes, Proteases, OpticalBrighteners
- AmphotericSurfactants, AnionicSurfactants, NonionicSurfactants, Soaps, Scents, Dyes
  - `AmphotericSurfactants` is for zwitterionic surfactants (e.g. betaines, amphopropionates) that carry both positive and negative charges. Do **not** add purely anionic or nonionic surfactants here.
- OxygenBleaches, OxygenBleachBoosters, SudsReducers, WaterConditioners
- Solvents, Thickeners, BitteringAgents, PacFilm, Fillers, Builders, FabricConditioners
  - `Solvents` is for liquid carriers and humectants (water, glycols, alcohols). Informational only — no grid column or filter.
  - `Thickeners` is for rheology modifiers: polysaccharide gums, ionic thickener salts, wax structurants. Informational only.
  - `BitteringAgents` is for trace-level taste deterrents added for child safety (e.g. denatonium benzoate). Informational only.
  - `PacFilm` is for water-soluble polymer film used to encase unit-dose pods/pacs. Informational only.
  - `Fillers` is for inert bulking/anticaking agents with minimal cleaning role (sodium sulfate, silica, etc.).
  - `Builders` is for ingredients that raise or buffer formula/wash-water pH (NaOH, KOH, ethanolamine, etc.). Distinct from `WaterConditioners` which chelate metal ions.
  - `FabricConditioners` is for agents that deposit onto fiber surfaces to improve softness, reduce static, or aid ironing (cationic polymers, bentonite clay). Distinct from `WaterConditioners` which modify water chemistry.
- Preservatives, DyeTransferInhibitors, SoilAntiRedeposition, NonBiodegradable, SepticUnfriendly, OdorEliminators
  - `DyeTransferInhibitors` is for **dye** anti-redeposition agents: fiber-coating agents (CMC) and solution-phase dye-capture polymers (PEI family). Do **not** add purely soil anti-redeposition polymers (e.g. polyacrylates, maleate/acrylate copolymers) or builders (e.g. sodium carbonate, silicates) to this set. Some ingredients (e.g. CelluloseGum, PolyethyleneimineAlkoxylated) appear in both `DyeTransferInhibitors` and `SoilAntiRedeposition` — this overlap is intentional.
  - `SoilAntiRedeposition` is for polymers that keep loosened soil/mineral particles suspended in wash water, preventing redeposition. **Not** for soil _release_ agents — see `SoilRelease`.
  - `SoilRelease` is for polymers that deposit a hydrophilic coating onto synthetic fiber surfaces (primarily polyester), making soils easier to remove in subsequent washes. **Not** for soil _anti-redeposition_ agents (see `SoilAntiRedeposition`) — soil release agents modify the fiber; anti-redeposition agents modify the wash solution.

Update the appropriate set file(s) so `DetergentProfile` derived flags remain accurate. Only place an ingredient into a category if the source explicitly indicates it.

## Ambiguity rules

- Generic surfactant terms stay generic; do not map to specific laureth or alketh variants without explicit source confirmation.
- If the source lists “enzymes” generically, do not add specific enzymes to the enum; note enzymes as TBD in the PR.
- If uncertain, add the profile with generic ingredients and list unknowns in the PR (draft).
