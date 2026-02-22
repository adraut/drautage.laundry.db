import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumBorate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumCitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.CalciumFormate,
  Ingredient.Alcohol,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
  Ingredient.Ethanolamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const GainAromaBoostHawaiianAloha: DetergentProfile = new DetergentProfile(
  'Aroma Boost Hawaiian Aloha',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostHawaiianAloha.countryOfOrigin = 'USA';
GainAromaBoostHawaiianAloha.countriesAvailable = ['USA'];

export default GainAromaBoostHawaiianAloha;
