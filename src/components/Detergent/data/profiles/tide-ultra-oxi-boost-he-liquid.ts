import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.MEALaurethSulfate,
  Ingredient.Alcohol,
  Ingredient.SodiumMEACitrate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Ethanolamine,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Cellulase,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Dimethicone,
];

const TideUltraOxiBoostHeLiquid: DetergentProfile = new DetergentProfile(
  'Ultra OXI Boost HE',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideUltraOxiBoostHeLiquid.countryOfOrigin = 'USA';
TideUltraOxiBoostHeLiquid.countriesAvailable = ['USA'];

export default TideUltraOxiBoostHeLiquid;
