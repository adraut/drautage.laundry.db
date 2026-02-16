import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients: Ingredient[] = [
    Ingredient.Water,
    Ingredient.SodiumC10_16Alkylbenzenesulfonate,
    Ingredient.SodiumLaurylSulfate,
    Ingredient.SodiumMEALaurethSulfate,
    Ingredient.C10_16Pareth,
    Ingredient.Subtilisin,
    Ingredient.Amylase,
    Ingredient.Mannanase,
    Ingredient.Cellulase,
    Ingredient.Fragrance,
];

const TideOriginalLiquid: DetergentProfile = new DetergentProfile(
    "Original", "Tide", DetergentType.Liquid, ingredients, new Date("2026-02-16"));
TideOriginalLiquid.countryOfOrigin = "USA";
TideOriginalLiquid.countriesAvailable = ["USA"];

export default TideOriginalLiquid;
