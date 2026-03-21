import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.SodiumCarbonate,
  Ingredient.C8_18FattyAcidsSodiumSalt,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Benzisothiazolinone,
];

const AllFreeClearAdvancedOxi: DetergentProfile = new DetergentProfile(
  'free clear Advanced OXI',
  'All',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
AllFreeClearAdvancedOxi.countryOfOrigin = 'USA';
AllFreeClearAdvancedOxi.countriesAvailable = ['USA'];
export default AllFreeClearAdvancedOxi;
