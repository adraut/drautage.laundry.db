import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEALaurethSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumMEACitrate,
  Ingredient.PropyleneGlycol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumBorate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Alcohol,
  Ingredient.SodiumMEALaurylSulfate,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.PentasodiumPentetate,
  Ingredient.FluorescentBrightener71,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Ethanolamine,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Amylase,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PectateLyase,
  Ingredient.Mannanase,
  Ingredient.Fragrance,
  Ingredient.SodiumFormate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
];

const TideUltraStainReleaseLiquid: DetergentProfile = new DetergentProfile(
  'Ultra Stain Release',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideUltraStainReleaseLiquid.countryOfOrigin = 'USA';
TideUltraStainReleaseLiquid.countriesAvailable = ['USA'];

export default TideUltraStainReleaseLiquid;
