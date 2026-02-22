import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Fragrance,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumBorate,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.MEALaurethSulfate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.SodiumBisulfite,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Subtilisin,
  Ingredient.Diethylenetriamine,
  Ingredient.Ethanolamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.Mannanase,
];

const TidePlusFebrezeFreshnessLiquid: DetergentProfile = new DetergentProfile(
  'Plus Febreze Freshness',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusFebrezeFreshnessLiquid.countryOfOrigin = 'USA';
TidePlusFebrezeFreshnessLiquid.countriesAvailable = ['USA'];

export default TidePlusFebrezeFreshnessLiquid;
