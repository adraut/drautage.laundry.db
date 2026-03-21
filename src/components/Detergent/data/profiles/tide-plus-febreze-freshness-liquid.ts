import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.MEALaurethSulfate,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.SodiumMEACitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Alcohol,
  Ingredient.Ethanolamine,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TidePlusFebrezeFreshnessLiquid: DetergentProfile = new DetergentProfile(
  'Plus Febreze Freshness',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
TidePlusFebrezeFreshnessLiquid.countryOfOrigin = 'USA';
TidePlusFebrezeFreshnessLiquid.countriesAvailable = ['USA'];

export default TidePlusFebrezeFreshnessLiquid;
