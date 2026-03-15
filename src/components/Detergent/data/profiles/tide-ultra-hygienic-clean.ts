import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurylSulfate,
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
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Alcohol,
  Ingredient.Ethanolamine,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TideUltraHygienicClean: DetergentProfile = new DetergentProfile(
  'Ultra Hygienic Clean',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-15'),
);
TideUltraHygienicClean.countriesAvailable = ['USA', 'CAN'];

export default TideUltraHygienicClean;
