import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.Amylase,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.CalciumFormate,
  Ingredient.Ethanolamine,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
  Ingredient.SodiumLaurethSulfate, // may contain
];

const EraOxiBooster: DetergentProfile = new DetergentProfile(
  'OxiBooster',
  'Era',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
EraOxiBooster.countryOfOrigin = 'USA';

export default EraOxiBooster;
