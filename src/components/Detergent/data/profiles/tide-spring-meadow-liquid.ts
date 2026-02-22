import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.MEALaurethSulfate,
  Ingredient.Alcohol,
  Ingredient.SodiumMEACitrate,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.Ethanolamine,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.CalciumFormate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Dimethicone,
];

const TideSpringMeadowLiquid: DetergentProfile = new DetergentProfile(
  'Spring Meadow',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideSpringMeadowLiquid.countryOfOrigin = 'USA';
TideSpringMeadowLiquid.countriesAvailable = ['USA'];

export default TideSpringMeadowLiquid;
