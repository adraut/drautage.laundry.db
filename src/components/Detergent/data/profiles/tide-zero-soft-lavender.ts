import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCitrate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumBorate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Fragrance,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Mannanase,
];

const TideZeroSoftLavender: DetergentProfile = new DetergentProfile(
  'Zero Soft Lavender',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideZeroSoftLavender.countryOfOrigin = 'USA';
TideZeroSoftLavender.countriesAvailable = ['USA'];

export default TideZeroSoftLavender;
