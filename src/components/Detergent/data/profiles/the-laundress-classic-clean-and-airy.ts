import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.Glycerin,
  Ingredient.Laureth_6,
  Ingredient.Fragrance,
  Ingredient.DecylGlucoside,
  Ingredient.LaurylBetaine,
  Ingredient.Triethanolamine,
  Ingredient.Protease,
  Ingredient.Pectinase,
  Ingredient.Cellulase,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.SodiumGluconate,
  Ingredient.CitricAcid,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
];

const TheLaundressClassicCleanAndAiry: DetergentProfile = new DetergentProfile(
  'Classic (Clean & Airy Scent)',
  'The Laundress',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);

export default TheLaundressClassicCleanAndAiry;
