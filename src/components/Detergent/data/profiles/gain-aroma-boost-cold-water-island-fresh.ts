import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumBorate,
  Ingredient.Fragrance,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Alcohol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.CalciumFormate,
  Ingredient.Ethanolamine,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumFormate,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
];

const GainAromaBoostColdWaterIslandFresh: DetergentProfile = new DetergentProfile(
  'Aroma Boost Cold Water Island Fresh',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostColdWaterIslandFresh.countryOfOrigin = 'USA';
GainAromaBoostColdWaterIslandFresh.countriesAvailable = ['USA'];

export default GainAromaBoostColdWaterIslandFresh;
