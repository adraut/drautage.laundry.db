import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.SodiumCitrate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Fragrance,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
];

const DreftStage1Newborn: DetergentProfile = new DetergentProfile(
  'Stage 1: Newborn',
  'Dreft',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
DreftStage1Newborn.countryOfOrigin = 'USA';
DreftStage1Newborn.countriesAvailable = ['USA'];

export default DreftStage1Newborn;
