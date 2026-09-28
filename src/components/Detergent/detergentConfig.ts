import { ProductCategoryConfig } from '../common/product/ProductCategoryConfig';
import { loadDetergents } from './data/detergents-data';

export const detergentConfig: ProductCategoryConfig = {
  title: 'Detergents',
  pluralLower: 'detergents',
  basePath: '/detergents',
  load: loadDetergents,
};
