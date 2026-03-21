import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.SodiumCarbonate,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.SodiumPolyacrylate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Benzisothiazolinone,
  Ingredient.HydroxypropylCyclodextrin,
];

const AllFreeClearOdorRelief: DetergentProfile = new DetergentProfile(
  'Free Clear Odor Relief',
  'All',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
AllFreeClearOdorRelief.countryOfOrigin = 'USA';
AllFreeClearOdorRelief.countriesAvailable = ['USA'];
export default AllFreeClearOdorRelief;
