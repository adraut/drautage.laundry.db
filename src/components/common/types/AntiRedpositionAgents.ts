import { Ingredient } from "./Ingredient";

const AntiRedpositionAgents: Set<Ingredient> = new Set();

AntiRedpositionAgents.add(Ingredient.AnionicModifiedPolyester);
AntiRedpositionAgents.add(Ingredient.CelluloseGum);
AntiRedpositionAgents.add(Ingredient.SodiumCarbonate);
AntiRedpositionAgents.add(Ingredient.SodiumPolyacrylate);
AntiRedpositionAgents.add(Ingredient.SodiumSilicate);

export { AntiRedpositionAgents };
