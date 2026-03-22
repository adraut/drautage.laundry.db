import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumMEACitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Ethanolamine,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const GainLavender: DetergentProfile = new DetergentProfile(
  'Lavender',
  'Gain',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
GainLavender.countriesAvailable = ['USA'];

export default GainLavender;
