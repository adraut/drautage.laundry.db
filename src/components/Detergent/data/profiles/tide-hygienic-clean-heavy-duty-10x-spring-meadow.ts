import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16Pareth,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.Fragrance,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumBorate,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.MEALaurethSulfate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.SodiumBisulfite,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.FluorescentBrightener71,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.Subtilisin,
  Ingredient.Diethylenetriamine,
  Ingredient.Ethanolamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.Mannanase,
];

const TideHygienicCleanHeavyDuty10xSpringMeadow: DetergentProfile = new DetergentProfile(
  'Hygienic Clean Heavy Duty 10X Spring Meadow',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideHygienicCleanHeavyDuty10xSpringMeadow.countryOfOrigin = 'USA';
TideHygienicCleanHeavyDuty10xSpringMeadow.countriesAvailable = ['USA'];

export default TideHygienicCleanHeavyDuty10xSpringMeadow;
