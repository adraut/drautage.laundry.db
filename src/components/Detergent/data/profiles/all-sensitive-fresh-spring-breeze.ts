import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.Fragrance,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.SodiumPolyacrylate,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.Benzisothiazolinone,
];

const AllSensitiveFreshSpringBreeze: DetergentProfile = new DetergentProfile(
  'Sensitive Fresh Spring Breeze',
  'All',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
AllSensitiveFreshSpringBreeze.countryOfOrigin = 'USA';
AllSensitiveFreshSpringBreeze.countriesAvailable = ['USA'];
export default AllSensitiveFreshSpringBreeze;
