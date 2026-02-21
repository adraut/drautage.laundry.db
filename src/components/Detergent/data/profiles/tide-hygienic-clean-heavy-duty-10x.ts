import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.MEALaurethSulfate,
  Ingredient.Alcohol,
  Ingredient.SodiumMEACitrate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Ethanolamine,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.Cellulase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Dimethicone,
];

const TideHygienicCleanHeavyDuty10x: DetergentProfile = new DetergentProfile(
  'Hygienic Clean Heavy Duty 10X',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideHygienicCleanHeavyDuty10x.countryOfOrigin = 'USA';
TideHygienicCleanHeavyDuty10x.countriesAvailable = ['USA'];

export default TideHygienicCleanHeavyDuty10x;
