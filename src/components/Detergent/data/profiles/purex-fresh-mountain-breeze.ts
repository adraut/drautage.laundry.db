import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumPolyacrylate,
  Ingredient.SodiumChloride,
  Ingredient.Fragrance,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.FluorescentBrightener28,
  Ingredient.Colorants,
  Ingredient.Methylisothiazolinone,
];

const PurexFreshMountainBreeze: DetergentProfile = new DetergentProfile(
  'Fresh Mountain Breeze',
  'Purex',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
PurexFreshMountainBreeze.countriesAvailable = ['USA'];
export default PurexFreshMountainBreeze;
