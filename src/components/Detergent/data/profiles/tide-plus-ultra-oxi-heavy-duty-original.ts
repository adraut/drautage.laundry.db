import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurethSulfate,
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
  Ingredient.Mannanase,
  Ingredient.Cellulase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Diethylenetriamine,
  Ingredient.Alcohol,
  Ingredient.Ethanolamine,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
  Ingredient.Water,
  Ingredient.PropyleneGlycol, // may contain
  Ingredient.SodiumCumenesulfonate,
];

const TidePlusUltraOxiHeavyDutyOriginal: DetergentProfile = new DetergentProfile(
  '+ Ultra Oxi Heavy Duty',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-04-06'),
);
TidePlusUltraOxiHeavyDutyOriginal.countryOfOrigin = 'USA';

export default TidePlusUltraOxiHeavyDutyOriginal;
