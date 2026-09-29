import { ProductCategoryConfig } from '../common/product/ProductCategoryConfig';
import { loadBoosters } from './data/boosters-data';

export const boosterConfig: ProductCategoryConfig = {
  title: 'Boosters',
  pluralLower: 'boosters',
  basePath: '/boosters',
  load: loadBoosters,
};
