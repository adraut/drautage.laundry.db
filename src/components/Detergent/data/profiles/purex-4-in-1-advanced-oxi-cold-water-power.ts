import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Laureth_12,
  Ingredient.SodiumChloride,
  Ingredient.SodiumFormate,
  Ingredient.SodiumPolyacrylate,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.Fragrance,
  Ingredient.SodiumCocoate,
  Ingredient.FluorescentBrightener28,
  Ingredient.CalciumChloride,
  Ingredient.Protease,
  Ingredient.TetrasodiumEDTA,
  Ingredient.Methylisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Amylase,
  Ingredient.Mannanase,
];

const PurexFourInOneAdvancedOxiColdWaterPower: DetergentProfile = new DetergentProfile(
  '4-in-1 Advanced OXI Cold Water Power',
  'Purex',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
PurexFourInOneAdvancedOxiColdWaterPower.countriesAvailable = ['USA'];
export default PurexFourInOneAdvancedOxiColdWaterPower;
