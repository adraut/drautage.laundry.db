import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Fragrance,
  Ingredient.SodiumCarbonate,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Benzisothiazolinone,
];

const AllBabyLiquid: DetergentProfile = new DetergentProfile(
  'Baby',
  'All',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
AllBabyLiquid.countriesAvailable = ['USA'];
export default AllBabyLiquid;
