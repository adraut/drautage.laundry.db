import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients : Ingredient[] = [
    Ingredient.SodiumSulfate,
    Ingredient.SodiumCarbonate,
    Ingredient.SodiumC10_16Alkylbenzenesulfonate,
    Ingredient.SodiumCarbonatePeroxide,
    Ingredient.SodiumSilicate,
    Ingredient.CalciumCarbonate,
    Ingredient.C10_16Alketh,
    Ingredient.Water,
    Ingredient.SodiumPolyacrylate,
    Ingredient.CelluloseGum,
    Ingredient.FluorescentBrightener71,
    Ingredient.C16_18FattyAcidsSodiumSalt,
    Ingredient.AnionicModifiedPolyester,
    Ingredient.DisodiumDistyrylbiphenylDisulfonate,
    Ingredient.SimethiconeDimethicone,
    Ingredient.Subtilisin,
    Ingredient.Amylase,
    Ingredient.Lipase,
];

const TideCleanGentle: DetergentProfile = new DetergentProfile(
    "Clean & Gentle", "Tide", DetergentType.Powder, ingredients, new Date("2026-01-31"));
TideCleanGentle.countryOfOrigin = "USA";
TideCleanGentle.countriesAvailable = ["USA"];

export default TideCleanGentle;