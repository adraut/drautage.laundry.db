import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumBorate,
  Ingredient.Fragrance,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.MEALaurethSulfate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.SodiumBisulfite,
  Ingredient.Ethanolamine,
  Ingredient.Subtilisin,
  Ingredient.Diethylenetriamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.Mannanase,
];

const TidePlusFebrezeBotanicalRainLiquid: DetergentProfile = new DetergentProfile(
  'Plus Febreze Botanical Rain',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusFebrezeBotanicalRainLiquid.countryOfOrigin = 'USA';
TidePlusFebrezeBotanicalRainLiquid.countriesAvailable = ['USA'];

export default TidePlusFebrezeBotanicalRainLiquid;
