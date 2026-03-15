import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

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

const PurexFourInOneBrightCleanFreshMountainBreeze: DetergentProfile = new DetergentProfile(
  '4-in-1 Bright Clean Fresh Mountain Breeze',
  'Purex',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
PurexFourInOneBrightCleanFreshMountainBreeze.countriesAvailable = ['USA'];
export default PurexFourInOneBrightCleanFreshMountainBreeze;
