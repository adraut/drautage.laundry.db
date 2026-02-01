import { Ingredient } from "./Ingredient";

const NonBiodegradable: Set<Ingredient> = new Set();

NonBiodegradable.add(Ingredient.FluorescentBrightener71);
NonBiodegradable.add(Ingredient.SimethiconeDimethicone);
NonBiodegradable.add(Ingredient.SodiumPolyacrylate);

export { NonBiodegradable };
