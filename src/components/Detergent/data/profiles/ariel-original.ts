import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients: Ingredient[] = [
    Ingredient.SodiumSulfate,
    Ingredient.SodiumC10_16Alkylbenzenesulfonate,
    Ingredient.SodiumCarbonate,
    Ingredient.SodiumSilicate,
    Ingredient.Water,
    Ingredient.CalciumCarbonate,
    Ingredient.SodiumPolyacrylate,
    Ingredient.Bentonite,
    Ingredient.C10_16Alketh,
    Ingredient.Fragrance,
    Ingredient.CelluloseGum,
    Ingredient.DisodiumDistyrylbiphenylDisulfonate,
    Ingredient.FluorescentBrightener71,
    Ingredient.Subtilisin,
    Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
    Ingredient.Lipase,
    Ingredient.PigmentRed5,
    Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
];

const ArielOriginal: DetergentProfile = new DetergentProfile(
    "Original", "Ariel", DetergentType.Powder, ingredients, new Date("2026-02-08"));
ArielOriginal.countriesAvailable = ["USA", "MEX"];

export default ArielOriginal;
