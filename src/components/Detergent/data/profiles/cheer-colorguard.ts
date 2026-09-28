import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurethSulfate, // may contain
  Ingredient.CalciumFormate,
  Ingredient.SodiumMEACitrate,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Ethanolamine,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const CheerColorGuard: DetergentProfile = new DetergentProfile(
  'ColorGuard',
  'Cheer',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
CheerColorGuard.countriesAvailable = ['USA', 'CAN'];

export default CheerColorGuard;
