import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCarbonate,
  Ingredient.Laureth_12,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Fragrance,
  Ingredient.SodiumCocoate,
  Ingredient.TetrasodiumEDTA,
  Ingredient.FluorescentBrightener28,
  Ingredient.Colorants,
  Ingredient.Methylisothiazolinone,
];

const PurexFourInOneFreshLavenderBlossom: DetergentProfile = new DetergentProfile(
  '4-in-1 Fresh Lavender Blossom',
  'Purex',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
PurexFourInOneFreshLavenderBlossom.countriesAvailable = ['USA'];
export default PurexFourInOneFreshLavenderBlossom;
