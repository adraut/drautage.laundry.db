import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.SodiumCitrate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Fragrance,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
];

const DreftStage2ActiveBaby: DetergentProfile = new DetergentProfile(
  'Stage 2: Active Baby',
  'Dreft',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);
DreftStage2ActiveBaby.countryOfOrigin = 'USA';
DreftStage2ActiveBaby.countriesAvailable = ['USA'];

export default DreftStage2ActiveBaby;
