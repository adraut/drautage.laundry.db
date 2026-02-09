import { Ingredient } from "./Ingredient";

const WaterConditioners: Set<Ingredient> = new Set();

WaterConditioners.add(Ingredient.SodiumBorate);
WaterConditioners.add(Ingredient.SodiumCarbonate);
WaterConditioners.add(Ingredient.SodiumCitrate);
WaterConditioners.add(Ingredient.SodiumCumenesulfonate);
WaterConditioners.add(Ingredient.SodiumSilicate);

export { WaterConditioners };
