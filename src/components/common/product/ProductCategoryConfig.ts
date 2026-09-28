import type { ColDef } from 'ag-grid-community';
import { ProductProfile } from './types/ProductProfile';
import type { FilterField } from './FilterDrawerContent';

/** Describes one product category (e.g. detergents, boosters) for the shared grid and compare views. */
export interface ProductCategoryConfig {
  /** Page heading, e.g. 'Detergents'. */
  title: string;
  /** Lowercase plural used in running text, e.g. 'detergents'. */
  pluralLower: string;
  /** Route of the category grid, e.g. '/detergents'. The compare view lives at `${basePath}/compare`. */
  basePath: string;
  load: () => Promise<Map<string, ProductProfile>>;
  /** Defaults to PRODUCT_FILTER_FIELDS. */
  filterFields?: FilterField[];
  /** Defaults to PRODUCT_COLUMN_DEFS. */
  columnDefs?: ColDef<ProductProfile>[];
}
