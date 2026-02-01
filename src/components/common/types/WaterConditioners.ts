import { Ingredient } from "./Ingredient";

const WaterConditioners: Set<Ingredient> = new Set();

WaterConditioners.add(Ingredient.SodiumCarbonate);
WaterConditioners.add(Ingredient.SodiumSilicate);

export { WaterConditioners };
