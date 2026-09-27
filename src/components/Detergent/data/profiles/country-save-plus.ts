import { Ingredient } from '../../../common/types/Ingredient';
import { DataSource } from '../../types/DataSource';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumSulfate,
  Ingredient.SodiumPercarbonate,
  Ingredient.SodiumAlkylArysulfonate,
  Ingredient.Laureth_7,
];

const CountrySavePlus: DetergentProfile = new DetergentProfile(
  'Plus',
  'Country Save',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
export default CountrySavePlus;
