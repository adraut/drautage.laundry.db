import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumBorate,
  Ingredient.SodiumCitrate,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.CalciumFormate,
  Ingredient.Alcohol,
  Ingredient.Subtilisin,
  Ingredient.Ethanolamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const GainAromaBoostAppleMangoTangoLiquid: DetergentProfile = new DetergentProfile(
  'Aroma Boost Apple Mango Tango',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostAppleMangoTangoLiquid.countryOfOrigin = 'USA';
GainAromaBoostAppleMangoTangoLiquid.countriesAvailable = ['USA'];

export default GainAromaBoostAppleMangoTangoLiquid;
