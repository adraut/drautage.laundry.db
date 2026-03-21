import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.CalciumFormate,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.SodiumCitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.Benzisothiazolinone,
];

const TideOdorRefreshFreeAndGentle: DetergentProfile = new DetergentProfile(
  'Free & Gentle Odor Refresh',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
TideOdorRefreshFreeAndGentle.countryOfOrigin = 'USA';
TideOdorRefreshFreeAndGentle.countriesAvailable = ['USA', 'CAN'];

export default TideOdorRefreshFreeAndGentle;
