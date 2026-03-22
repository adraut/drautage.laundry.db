import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumMEACitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Ethanolamine,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const GainIslandFresh: DetergentProfile = new DetergentProfile(
  'Island Fresh',
  'Gain',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
GainIslandFresh.countriesAvailable = ['USA'];

export default GainIslandFresh;
