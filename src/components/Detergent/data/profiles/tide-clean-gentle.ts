import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumPercarbonate,
  Ingredient.SodiumSilicate,
  Ingredient.CalciumCarbonate,
  Ingredient.C10_16Alketh,
  Ingredient.Water,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CelluloseGum,
  Ingredient.FluorescentBrightener71,
  Ingredient.C16_18FattyAcidsSodiumSalt,
  Ingredient.AnionicModifiedPolyester,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SimethiconeDimethicone,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Lipase,
];

const TideCleanGentle: DetergentProfile = new DetergentProfile(
  'Clean & Gentle',
  'Tide',
  ProductType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
TideCleanGentle.countryOfOrigin = 'USA';
TideCleanGentle.countriesAvailable = ['USA'];

export default TideCleanGentle;
