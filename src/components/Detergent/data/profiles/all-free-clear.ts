import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients: Ingredient[] = [
    Ingredient.Water,
    Ingredient.C12_15AlcoholsEthoxylated,
    Ingredient.SodiumLaurethSulfate,
    Ingredient.TrisodiumDicarboxymethylAlaninate,
    Ingredient.Ethanol,
    Ingredient.PolyethyleneimineAlkoxylated,
    Ingredient.SodiumBicarbonate,
    Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer,
    Ingredient.C8_18FattyAcidsSodiumSalt,
    Ingredient.Benzisothiazolinone,
];

const AllFreeClear: DetergentProfile = new DetergentProfile(
    "Free Clear", "All", DetergentType.Liquid, ingredients);
AllFreeClear.countryOfOrigin = "USA";
AllFreeClear.countriesAvailable = ["USA"];
AllFreeClear.isHardWaterTolerant = false;
export default AllFreeClear;