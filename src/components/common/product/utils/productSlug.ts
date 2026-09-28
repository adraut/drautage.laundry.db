import { ProductProfile } from '../types/ProductProfile';

export function findProductBySlug<T extends ProductProfile>(slug: string, products: Map<string, T>): T | null {
  for (const product of products.values()) {
    if (product.slug === slug) {
      return product;
    }
  }
  return null;
}
