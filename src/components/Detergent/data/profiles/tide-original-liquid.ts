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
  Ingredient.Fragrance,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumBorate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.SodiumMEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.FluorescentBrightener71,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.CalciumFormate,
  Ingredient.Diethylenetriamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
];

const TideOriginalLiquid: DetergentProfile = new DetergentProfile(
  'Original',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-16'),
);
TideOriginalLiquid.countryOfOrigin = 'USA';
TideOriginalLiquid.countriesAvailable = ['USA'];

export default TideOriginalLiquid;
