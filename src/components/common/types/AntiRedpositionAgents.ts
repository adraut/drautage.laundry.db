import { Ingredient } from './Ingredient';

const AntiRedpositionAgents: Set<Ingredient> = new Set();

AntiRedpositionAgents.add(Ingredient.AnionicModifiedPolyester);
AntiRedpositionAgents.add(Ingredient.Bentonite);
AntiRedpositionAgents.add(Ingredient.CelluloseGum);
AntiRedpositionAgents.add(Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer);
AntiRedpositionAgents.add(Ingredient.SodiumCarbonate);
AntiRedpositionAgents.add(Ingredient.SodiumMetasilicate);
AntiRedpositionAgents.add(Ingredient.SodiumPolyacrylate);
AntiRedpositionAgents.add(Ingredient.SodiumSilicate);

export { AntiRedpositionAgents };
