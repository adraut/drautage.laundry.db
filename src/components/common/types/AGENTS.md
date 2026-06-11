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

- Enzymes, Proteases, OpticalBrighteners, EnzymeStabilizers
  - `EnzymeStabilizers` is for additives that protect hydrolytic enzymes (proteases, amylases, etc.)
    from degradation in liquid formulations (e.g. formate salts). Distinct from `Enzymes` (functional
    cleaning agents) and `Preservatives` (which protect against microbial growth).
- AmphotericSurfactants, AnionicSurfactants, NonionicSurfactants, Soaps, Scents, Colorants, Sulfates
  - `AmphotericSurfactants` is for zwitterionic surfactants (e.g. betaines, amphopropionates) that carry both positive and negative charges. Do **not** add purely anionic or nonionic surfactants here.
  - `Sulfates` is for any ingredient that is a sulfate compound (contains SO₄²⁻ or the ester-sulfate -OSO₃⁻ group). This includes surfactant sulfates such as SLS and SLES (which also appear in `AnionicSurfactants`) as well as non-surfactant inorganic sulfates used as fillers (e.g. sodium sulfate). Do **not** add sulfonates (alkylbenzene sulfonates, LAS) or carboxylate/fatty-acid salts — they are chemically distinct from sulfates.
- OxygenBleaches, OxygenBleachBoosters, SudsReducers, WaterConditioners
- Solvents, Thickeners, BitteringAgents, PacFilm, Fillers, Builders, FabricConditioners
  - `Solvents` is for liquid carriers and humectants (water, glycols, alcohols). Informational only — no grid column or filter.
  - `Thickeners` is for rheology modifiers: polysaccharide gums, ionic thickener salts, wax structurants. Informational only.
  - `BitteringAgents` is for trace-level taste deterrents added for child safety (e.g. denatonium benzoate). Informational only.
  - `PacFilm` is for water-soluble polymer film used to encase unit-dose pods/pacs. Informational only.
  - `Fillers` is for inert bulking/anticaking agents with minimal cleaning role (sodium sulfate, silica, etc.).
  - `Builders` is for ingredients that raise or buffer formula/wash-water pH (NaOH, KOH, ethanolamine, etc.). Distinct from `WaterConditioners` which chelate metal ions.
  - `FabricConditioners` is for agents that deposit onto fiber surfaces to improve softness, reduce static, or aid ironing (cationic polymers, bentonite clay). Distinct from `WaterConditioners` which modify water chemistry.
- ProcessingAids
  - `ProcessingAids` is for ingredients that serve a manufacturing/processing role in the formulation rather than a cleaning or conditioning role (e.g. binders, granulation aids, flow agents). An ingredient may belong to both `ProcessingAids` and another functional category (e.g. `Soaps`) globally; context rules or profile-level exclusions narrow its effective categories for specific products.
- Preservatives, FabricAntioxidants, DyeTransferInhibitors, SoilAntiRedeposition, NonBiodegradable, SepticUnfriendly, OdorEliminators
  - `FabricAntioxidants` is for lipid-soluble hindered phenol antioxidants that deposit onto textile fibers and inhibit oxidative degradation of residual oils between wears, preventing rancidity-derived odor formation. Distinct from `Preservatives` (which protect the detergent formula) — ingredients here typically appear in both sets. Distinct from `OdorEliminators` (which act reactively); fabric antioxidants act preventatively on the textile substrate.
  - `DyeTransferInhibitors` is for **dye** anti-redeposition agents: fiber-coating agents (CMC) and solution-phase dye-capture polymers (PEI family). Do **not** add purely soil anti-redeposition polymers (e.g. polyacrylates, maleate/acrylate copolymers) or builders (e.g. sodium carbonate, silicates) to this set. Some ingredients (e.g. CelluloseGum, PolyethyleneimineAlkoxylated) appear in both `DyeTransferInhibitors` and `SoilAntiRedeposition` — this overlap is intentional.
  - `SoilAntiRedeposition` is for polymers that keep loosened soil/mineral particles suspended in wash water, preventing redeposition. **Not** for soil _release_ agents — see `SoilRelease`.
  - `SoilRelease` is for polymers that deposit a hydrophilic coating onto synthetic fiber surfaces (primarily polyester), making soils easier to remove in subsequent washes. **Not** for soil _anti-redeposition_ agents (see `SoilAntiRedeposition`) — soil release agents modify the fiber; anti-redeposition agents modify the wash solution.

Update the appropriate set file(s) so `DetergentProfile` derived flags remain accurate. Only place an ingredient into a category if the source explicitly indicates it.

> **Note:** `IngredientCategoryMap.ts` is built automatically from all category set files at runtime — you do **not** need to edit it directly. Adding an ingredient to a set file is sufficient for it to appear in the map.

## Context rules

Context rules in [IngredientContextRules.ts](IngredientContextRules.ts) automatically exclude an ingredient from one or more of its default categories based on the composition or ordering of the ingredient list for a specific product. They are evaluated at `DetergentProfile` construction time and do **not** modify the global category sets.

- **When to add a rule**: When an ingredient reliably performs a different function in the presence of another ingredient (or based on its relative position in the list), and this pattern applies across multiple products rather than to one product specifically.
- **Rule structure**: `ingredient` (the target), `condition(ingredients[])` (returns true when the exclusion applies), `excludeFromCategories` (array of category label strings to remove).
- **Profile-level overrides**: For product-specific edge cases that do not fit a general rule, pass `options.categoryExclusions` to the `DetergentProfile` constructor. These are merged on top of context rules with higher priority.
- **Label strings must match exactly** the label used in `IngredientCategoryMap.ts` (e.g. `'Soap'`, `'Processing Aid'`).

Example — C16-18 fatty acid sodium salts in powder detergents with SodiumPolyacrylate:
Ingredient lists follow highest-concentration-first convention. When `SodiumPolyacrylate` appears before `C16_18FattyAcidsSodiumSalt`, the polymer handles hard-water mineral management, so the fatty acid salt functions as a binder/processing aid rather than as an active soap surfactant. The rule excludes it from `'Soap'` in that context; it remains in `'Processing Aid'`.

## Ambiguity rules

- Generic surfactant terms stay generic; do not map to specific laureth or alketh variants without explicit source confirmation.
- If the source lists “enzymes” generically, do not add specific enzymes to the enum; note enzymes as TBD in the PR.
- If uncertain, add the profile with generic ingredients and list unknowns in the PR (draft).
