import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumMEALaurethSulfate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumBorate,
  Ingredient.Fragrance,
  Ingredient.PropyleneGlycol,
  Ingredient.PentasodiumPentetate,
  Ingredient.Alcohol,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumFormate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
  Ingredient.Amylase,
  Ingredient.Ethanolamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.BlendOfAcidBlue9AndYellow5,
];

const GainAromaBoostBlissfulBreeze: DetergentProfile = new DetergentProfile(
  'Aroma Boost Blissful Breeze',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostBlissfulBreeze.countryOfOrigin = 'USA';
GainAromaBoostBlissfulBreeze.countriesAvailable = ['USA'];

export default GainAromaBoostBlissfulBreeze;
