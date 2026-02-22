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
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.Ethanolamine,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumFormate,
];

const GainOdorDefenseSuperFresh: DetergentProfile = new DetergentProfile(
  'Odor Defense Super Fresh',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainOdorDefenseSuperFresh.countryOfOrigin = 'USA';
GainOdorDefenseSuperFresh.countriesAvailable = ['USA'];

export default GainOdorDefenseSuperFresh;
