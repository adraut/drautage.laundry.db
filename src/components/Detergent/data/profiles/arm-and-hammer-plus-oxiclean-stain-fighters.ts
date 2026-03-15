import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Water,
  Ingredient.SodiumBicarbonate,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.PotassiumChloride,
  Ingredient.SodiumSulfate,
  Ingredient.ModifiedAcrylicCopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Fragrance,
  Ingredient.Colorants,
  Ingredient.SodiumPercarbonate,
  Ingredient.Protease,
  Ingredient.Amylase,
];

const ArmAndHammerPlusOxiCleanStainFighters: DetergentProfile = new DetergentProfile(
  'Plus OxiClean Stain Fighters',
  'Arm & Hammer',
  DetergentType.Powder,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerPlusOxiCleanStainFighters.countriesAvailable = ['USA'];

export default ArmAndHammerPlusOxiCleanStainFighters;
