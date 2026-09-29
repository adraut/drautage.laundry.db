import { Ingredient } from '../../../common/types/Ingredient';
import { DataSource } from '../../../common/product/types/DataSource';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumChloride,
  Ingredient.Deoxyribonuclease,
  Ingredient.LaurylGlucoside,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Lipase,
  Ingredient.Pectinase,
  Ingredient.Mannanase,
  Ingredient.SodiumBicarbonate,
  Ingredient.Fragrance,
  Ingredient.CitricAcid,
  Ingredient.Benzisothiazolinone,
];

const WholeFoods365SportFresh: DetergentProfile = new DetergentProfile(
  '365 Sport Fresh Scent',
  'Whole Foods',
  ProductType.Liquid,
  DataSource.SDS,
  ingredients,
  new Date('2026-01-31'),
);
WholeFoods365SportFresh.countryOfOrigin = 'USA';
WholeFoods365SportFresh.countriesAvailable = ['USA'];
export default WholeFoods365SportFresh;
