import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEALaurethSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumMEACitrate,
  Ingredient.Alcohol,
  Ingredient.SodiumBorate,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.SodiumMEALaurylSulfate,
  Ingredient.PentasodiumPentetate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.FluorescentBrightener71,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.CalciumFormate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.Ethanolamine,
  Ingredient.Simethicone,
  Ingredient.Amylase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Mannanase,
  Ingredient.Fragrance,
  Ingredient.SodiumFormate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
];

const TidePlusBleachAlternativeLiquid: DetergentProfile = new DetergentProfile(
  'Plus Bleach Alternative',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusBleachAlternativeLiquid.countryOfOrigin = 'USA';
TidePlusBleachAlternativeLiquid.countriesAvailable = ['USA'];

export default TidePlusBleachAlternativeLiquid;
