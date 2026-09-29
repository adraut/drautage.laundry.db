import { BoosterProfile } from '../types/BoosterProfile';
import { ProductProfile } from '../../common/product/types/ProductProfile';
import { ProductType } from '../../common/product/types/ProductType';
import { DataSource } from '../../common/product/types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

describe('BoosterProfile', () => {
  it('is a ProductProfile with ingredient-derived flags', () => {
    const profile = new BoosterProfile(
      'Test',
      'Brand',
      ProductType.Powder,
      DataSource.Package,
      [Ingredient.SodiumPercarbonate],
      new Date('2026-01-01'),
    );
    expect(profile).toBeInstanceOf(ProductProfile);
    expect(profile.hasOxygenBleach).toBe(true);
  });
});
