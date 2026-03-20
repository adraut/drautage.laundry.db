import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCitrate,
  Ingredient.Alcohol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Subtilisin,
  Ingredient.CalciumFormate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
];

const TidePurcleanHoneyLavender: DetergentProfile = new DetergentProfile(
  'Purclean Honey Lavender',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-20'),
);
TidePurcleanHoneyLavender.countryOfOrigin = 'USA';
TidePurcleanHoneyLavender.countriesAvailable = ['USA'];

export default TidePurcleanHoneyLavender;
