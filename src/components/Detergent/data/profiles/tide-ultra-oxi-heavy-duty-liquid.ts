import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.MEALaurethSulfate,
  Ingredient.SodiumBorate,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.SodiumMEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Fragrance,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.Ethanolamine,
  Ingredient.CalciumFormate,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Diethylenetriamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.Amylase,
  Ingredient.PectateLyase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
];

const TideUltraOxiHeavyDutyLiquid: DetergentProfile = new DetergentProfile(
  'Ultra Oxi + Heavy Duty',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideUltraOxiHeavyDutyLiquid.countryOfOrigin = 'USA';
TideUltraOxiHeavyDutyLiquid.countriesAvailable = ['USA'];

export default TideUltraOxiHeavyDutyLiquid;
