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
  Ingredient.Subtilisin,
  Ingredient.Alcohol,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
  Ingredient.Amylase,
  Ingredient.Ethanolamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const GainAromaBoostLavender: DetergentProfile = new DetergentProfile(
  'Aroma Boost Lavender',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostLavender.countryOfOrigin = 'USA';
GainAromaBoostLavender.countriesAvailable = ['USA'];

export default GainAromaBoostLavender;
