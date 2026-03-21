import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.SodiumCitrate,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Mannanase,
];

const TideFreeGentle: DetergentProfile = new DetergentProfile(
  'Free and Gentle',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
TideFreeGentle.countryOfOrigin = 'USA';
TideFreeGentle.countriesAvailable = ['USA'];

export default TideFreeGentle;
