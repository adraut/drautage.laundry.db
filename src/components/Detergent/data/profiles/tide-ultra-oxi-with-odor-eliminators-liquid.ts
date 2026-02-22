import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEALaurethSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.C10_16Pareth,
  Ingredient.PropyleneGlycol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumBorate,
  Ingredient.Alcohol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.Fragrance,
  Ingredient.PentasodiumPentetate,
  Ingredient.FluorescentBrightener71,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.CalciumFormate,
  Ingredient.Ethanolamine,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Diethylenetriamine,
  Ingredient.Amylase,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PectateLyase,
  Ingredient.Mannanase,
  Ingredient.SodiumFormate,
];

const TideUltraOxiWithOdorEliminatorsLiquid: DetergentProfile = new DetergentProfile(
  'Ultra OXI with Odor Eliminators',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideUltraOxiWithOdorEliminatorsLiquid.countryOfOrigin = 'USA';
TideUltraOxiWithOdorEliminatorsLiquid.countriesAvailable = ['USA'];

export default TideUltraOxiWithOdorEliminatorsLiquid;
