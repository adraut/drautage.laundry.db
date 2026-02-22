import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.MEALaurethSulfate,
  Ingredient.SodiumBorate,
  Ingredient.Fragrance,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.SodiumMEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Ethanolamine,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.CalciumFormate,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.Subtilisin,
  Ingredient.Diethylenetriamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.Mannanase,
  Ingredient.Cellulase,
];

const TidePlusATouchOfDownyLiquid: DetergentProfile = new DetergentProfile(
  'Plus A Touch of Downy',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusATouchOfDownyLiquid.countryOfOrigin = 'USA';
TidePlusATouchOfDownyLiquid.countriesAvailable = ['USA'];

export default TidePlusATouchOfDownyLiquid;
