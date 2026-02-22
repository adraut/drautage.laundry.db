import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumBorate,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.Alcohol,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Ethanolamine,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
];

const GainUltraPlusOxiOriginal: DetergentProfile = new DetergentProfile(
  'Ultra + Oxi Original',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainUltraPlusOxiOriginal.countryOfOrigin = 'USA';
GainUltraPlusOxiOriginal.countriesAvailable = ['USA'];

export default GainUltraPlusOxiOriginal;
