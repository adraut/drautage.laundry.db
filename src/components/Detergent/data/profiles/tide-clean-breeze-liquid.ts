import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.Alcohol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.MEALaurethSulfate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumBorate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Fragrance,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.SodiumMEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Subtilisin,
  Ingredient.CalciumFormate,
  Ingredient.Diethylenetriamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.SodiumFormate,
  Ingredient.Ethanolamine,
];

const TideCleanBreezeLiquid: DetergentProfile = new DetergentProfile(
  'Clean Breeze',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideCleanBreezeLiquid.countryOfOrigin = 'USA';
TideCleanBreezeLiquid.countriesAvailable = ['USA'];

export default TideCleanBreezeLiquid;
