import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  'Rain Water',
  "Mrs. Meyer's Clean Day",
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
MrsMeyersCleanDayLaundryDetergentRainWater.countriesAvailable = ['USA'];
export default MrsMeyersCleanDayLaundryDetergentRainWater;
