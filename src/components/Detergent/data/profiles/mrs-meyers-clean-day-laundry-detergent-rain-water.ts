import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_7,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumChloride,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.Fragrance,
  Ingredient.HexylCinnamal,
  Ingredient.RosaDamascenaFlowerExtract,
  Ingredient.JuniperusVirginianaCedarwoodOil,
  Ingredient.CoconutFattyAcid,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Pectinase,
  Ingredient.Mannanase,
  Ingredient.CalciumChloride,
  Ingredient.SodiumHydroxide,
  Ingredient.CitricAcid,
  Ingredient.Methylisothiazolinone,
];

const MrsMeyersCleanDayLaundryDetergentRainWater: DetergentProfile = new DetergentProfile(
  'Laundry Detergent',
  "Mrs. Meyer's Clean Day",
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);
MrsMeyersCleanDayLaundryDetergentRainWater.countriesAvailable = ['USA'];
export default MrsMeyersCleanDayLaundryDetergentRainWater;
