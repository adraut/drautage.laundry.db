import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_7,
  Ingredient.LaurylGlucoside,
  Ingredient.SodiumMethyl2Sulfolaurate,
  Ingredient.FattyAcidC8_18AndC18Unsaturated,
  Ingredient.Fragrance,
  Ingredient.SodiumCitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Lipase,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Glycerin,
  Ingredient.CitrusAurantiumDulcisOrangePeelOil,
  Ingredient.CalciumChloride,
  Ingredient.SodiumChloride,
  Ingredient.SodiumSulfate,
  Ingredient.PotassiumHydroxide,
  Ingredient.Methylisothiazolinone,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
];

const MrsMeyersCleanDayLaundryDetergentCompassionFlower: DetergentProfile = new DetergentProfile(
  'Compassion Flower',
  "Mrs. Meyer's Clean Day",
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
MrsMeyersCleanDayLaundryDetergentCompassionFlower.countriesAvailable = ['USA'];
export default MrsMeyersCleanDayLaundryDetergentCompassionFlower;
