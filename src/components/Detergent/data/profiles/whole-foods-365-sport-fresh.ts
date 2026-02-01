import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients: Ingredient[] = [
    Ingredient.Water,
    Ingredient.Glycerin,
    Ingredient.SodiumLaurethEtherSulfate,
    Ingredient.SodiumCitrate,
    Ingredient.SodiumChloride,
    Ingredient.DNase,
    Ingredient.LaurylGlucoside,
    Ingredient.Protease,
    Ingredient.Amylase,
    Ingredient.Lipase,
    Ingredient.Pectinase,
    Ingredient.Mannanase,
    Ingredient.SodiumBicarbonate,
    Ingredient.Fragrance,
    Ingredient.CitricAcid,
    Ingredient.Benzisothiazolinone,
];

const WholeFoods365SportFresh: DetergentProfile = new DetergentProfile(
    "365 Sport Fresh Scent", "Whole Foods", DetergentType.Liquid, ingredients);
WholeFoods365SportFresh.countryOfOrigin = "USA";
WholeFoods365SportFresh.countriesAvailable = ["USA"];
WholeFoods365SportFresh.isHardWaterTolerant = true;
export default WholeFoods365SportFresh;