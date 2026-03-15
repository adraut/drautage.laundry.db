import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumMEACitrate,
  Ingredient.Fragrance,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Ethanolamine,
  Ingredient.Alcohol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
];

const GainOdorDefenseSuperFresh: DetergentProfile = new DetergentProfile(
  'Odor Defense Super Fresh',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-15'),
);
GainOdorDefenseSuperFresh.countryOfOrigin = 'USA';
GainOdorDefenseSuperFresh.countriesAvailable = ['USA'];

export default GainOdorDefenseSuperFresh;
