import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.MEALaurethSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumMEAC12_18FattyAcidsSalt,
  Ingredient.PhenylpropylEthylMethicone,
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

const TideOriginalLiquid: DetergentProfile = new DetergentProfile(
  'Original',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
TideOriginalLiquid.countryOfOrigin = 'USA';
TideOriginalLiquid.countriesAvailable = ['USA'];

export default TideOriginalLiquid;
