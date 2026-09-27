import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
CheerColorGuard.countriesAvailable = ['USA', 'CAN'];

export default CheerColorGuard;
