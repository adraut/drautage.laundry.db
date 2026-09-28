import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumOleate,
  Ingredient.SodiumSulfate,
  Ingredient.CitricAcid,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
];

const SeventhGenerationSensitiveSkinFreeAndClear: DetergentProfile = new DetergentProfile(
  'Sensitive Skin Free & Clear',
  'Seventh Generation',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
SeventhGenerationSensitiveSkinFreeAndClear.countriesAvailable = ['USA'];
export default SeventhGenerationSensitiveSkinFreeAndClear;
