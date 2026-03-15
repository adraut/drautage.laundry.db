import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16Alketh,
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.MEALaurethSulfate,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.MEACitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
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
];

const TideUltraSport: DetergentProfile = new DetergentProfile(
  'Ultra Sport',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-15'),
);
TideUltraSport.countriesAvailable = ['USA', 'CAN'];

export default TideUltraSport;
