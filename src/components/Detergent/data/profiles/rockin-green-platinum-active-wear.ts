import { Ingredient } from "../../../common/types/Ingredient";
import { DetergentProfile } from "../../types/DetergentProfile";
import { DetergentType } from "../../types/DetergentType";

const ingredients : Ingredient[] = [
    Ingredient.SodiumCarbonate,
    Ingredient.SodiumPercarbonate,
    Ingredient.LinearAlcoholEthoxylates,
    Ingredient.SaltCake,
    Ingredient.Lipase,
    Ingredient.Mannanase,
    Ingredient.Protease,
    Ingredient.TeaTreeOil
];

const RockinGreenPlatinumActiveWear: DetergentProfile = new DetergentProfile(
    "Platinum Active Wear", "Rockin' Green", DetergentType.Powder, ingredients);
RockinGreenPlatinumActiveWear.countryOfOrigin = "USA";
RockinGreenPlatinumActiveWear.countriesAvailable = ["USA"];
RockinGreenPlatinumActiveWear.isHardWaterTolerant = true;
export default RockinGreenPlatinumActiveWear;