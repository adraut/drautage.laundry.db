import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients : Ingredient[] = [
    Ingredient.Water,
    Ingredient.C10_16Pareth,
    Ingredient.SodiumC10_16Alkylbenzenesulfonate,
    Ingredient.C12_18FattyAcidsSodiumSalt,
    Ingredient.PropyleneGlycol,
    Ingredient.PolyethyleneimineAlkoxylated,
    Ingredient.SodiumCitrate,
    Ingredient.SodiumBorate,
    Ingredient.SodiumCumenesulfonate,
    Ingredient.C10_16AlkyldimethylamineOxide,
    Ingredient.Subtilisin,
    Ingredient.SodiumFormate,
    Ingredient.Amylase,
    Ingredient.Mannanase,
];

const TideFreeGentle: DetergentProfile = new DetergentProfile(
    "Free and Gentle", "Tide", DetergentType.Liquid, ingredients, new Date("2026-02-08"));
TideFreeGentle.countryOfOrigin = "USA";
TideFreeGentle.countriesAvailable = ["USA"];

export default TideFreeGentle;
