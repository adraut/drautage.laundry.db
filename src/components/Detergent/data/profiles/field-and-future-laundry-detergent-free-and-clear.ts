import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.CocoGlucoside,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumOleate,
  Ingredient.Glycerin,
  Ingredient.Alcohol,
  Ingredient.SodiumCitrate,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Lipase,
  Ingredient.Cellulase,
  Ingredient.PectateLyase,
  Ingredient.Methylisothiazolinone,
  Ingredient.Benzisothiazolinone,
];

const FieldAndFutureLaundryDetergentFreeAndClear: DetergentProfile = new DetergentProfile(
  'Free and Clear',
  'field & future',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-05-03'),
);
FieldAndFutureLaundryDetergentFreeAndClear.countriesAvailable = ['USA'];
export default FieldAndFutureLaundryDetergentFreeAndClear;
