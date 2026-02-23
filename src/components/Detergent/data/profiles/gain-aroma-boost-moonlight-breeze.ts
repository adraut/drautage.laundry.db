import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumBorate,
  Ingredient.Fragrance,
  Ingredient.PentasodiumPentetate,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
  Ingredient.Ethanolamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.SodiumFormate,
];

const GainAromaBoostMoonlightBreeze: DetergentProfile = new DetergentProfile(
  'Aroma Boost Moonlight Breeze',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostMoonlightBreeze.countryOfOrigin = 'USA';
GainAromaBoostMoonlightBreeze.countriesAvailable = ['USA'];

export default GainAromaBoostMoonlightBreeze;
