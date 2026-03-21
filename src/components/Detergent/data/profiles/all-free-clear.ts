import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.C8_18FattyAcidsSodiumSalt,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Benzisothiazolinone,
];

const AllFreeClear: DetergentProfile = new DetergentProfile(
  'Free Clear',
  'All',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
AllFreeClear.countryOfOrigin = 'USA';
AllFreeClear.countriesAvailable = ['USA'];
export default AllFreeClear;
