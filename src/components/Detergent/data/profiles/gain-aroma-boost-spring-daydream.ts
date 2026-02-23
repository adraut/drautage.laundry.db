import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumBorate,
  Ingredient.SodiumMEACitrate,
  Ingredient.Fragrance,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Alcohol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.Ethanolamine,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumFormate,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
];

const GainAromaBoostSpringDaydream: DetergentProfile = new DetergentProfile(
  'Aroma Boost Spring Daydream',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainAromaBoostSpringDaydream.countryOfOrigin = 'USA';
GainAromaBoostSpringDaydream.countriesAvailable = ['USA'];

export default GainAromaBoostSpringDaydream;
