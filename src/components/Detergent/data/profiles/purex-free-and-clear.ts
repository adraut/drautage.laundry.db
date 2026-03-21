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
  Ingredient.SodiumCocoate,
  Ingredient.TetrasodiumEDTA,
  Ingredient.FluorescentBrightener28,
  Ingredient.Methylisothiazolinone,
];

const PurexFreeAndClear: DetergentProfile = new DetergentProfile(
  'Free & Clear',
  'Purex',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
PurexFreeAndClear.countriesAvailable = ['USA'];
export default PurexFreeAndClear;
