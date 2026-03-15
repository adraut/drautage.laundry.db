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
  Ingredient.SodiumCocoate,
  Ingredient.TetrasodiumEDTA,
  Ingredient.FluorescentBrightener28SodiumSalt,
  Ingredient.Methylisothiazolinone,
];

const PurexFreeAndClear: DetergentProfile = new DetergentProfile(
  'Free & Clear',
  'Purex',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
PurexFreeAndClear.countriesAvailable = ['USA'];
export default PurexFreeAndClear;
