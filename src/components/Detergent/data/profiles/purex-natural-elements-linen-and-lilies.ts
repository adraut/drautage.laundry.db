import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumChloride,
  Ingredient.Laureth_12,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumCocoate,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumEDTA,
  Ingredient.Methylisothiazolinone,
];

const PurexNaturalElementsLinenAndLilies: DetergentProfile = new DetergentProfile(
  'Natural Elements Linen & Lilies',
  'Purex',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
PurexNaturalElementsLinenAndLilies.countriesAvailable = ['USA'];
export default PurexNaturalElementsLinenAndLilies;
