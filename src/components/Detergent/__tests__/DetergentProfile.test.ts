import { DetergentProfile } from '../types/DetergentProfile';
import { ProductProfile } from '../../common/product/types/ProductProfile';
import { ProductType } from '../../common/product/types/ProductType';
import { DataSource } from '../../common/product/types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

describe('DetergentProfile', () => {
  it('is a ProductProfile with ingredient-derived flags', () => {
    const profile = new DetergentProfile(
      'Test',
      'Brand',
      ProductType.Liquid,
      DataSource.Package,
      [Ingredient.Amylase],
      new Date('2026-01-01'),
    );
    expect(profile).toBeInstanceOf(ProductProfile);
    expect(profile.hasAmylase).toBe(true);
    expect(profile.slug).toBe('brand-test-liquid');
  });
});
