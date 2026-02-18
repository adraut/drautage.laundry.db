import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.SodiumCitrate,
  Ingredient.PropyleneGlycol,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.Alcohol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
];

const TideFreeGentleOdorRefresh: DetergentProfile = new DetergentProfile(
  'Free and Gentle Odor Refresh',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-08'),
);
TideFreeGentleOdorRefresh.countryOfOrigin = 'USA';
TideFreeGentleOdorRefresh.countriesAvailable = ['USA'];

export default TideFreeGentleOdorRefresh;
