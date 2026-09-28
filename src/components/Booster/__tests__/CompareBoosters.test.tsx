import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CompareBoosters from '../CompareBoosters';
import { loadBoosters } from '../data/boosters-data';
import { BoosterProfile } from '../types/BoosterProfile';
import { ProductType } from '../../common/product/types/ProductType';
import { DataSource } from '../../common/product/types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

jest.mock('../data/boosters-data');

const mockedLoad = loadBoosters as jest.MockedFunction<typeof loadBoosters>;

describe('CompareBoosters', () => {
  it('links back to the boosters grid', async () => {
    mockedLoad.mockResolvedValue(new Map());
    render(
      <MemoryRouter initialEntries={['/boosters/compare']}>
        <CompareBoosters />
      </MemoryRouter>,
    );

    const back = await screen.findByRole('link', { name: '← Back to boosters' });
    expect(back).toHaveAttribute('href', '/boosters');
    expect(await screen.findByText(/No products selected/)).toBeInTheDocument();
  });

  it('shows selected boosters side by side', async () => {
    const booster = new BoosterProfile(
      'Stain Fighter',
      'TestBrand',
      ProductType.Powder,
      DataSource.Package,
      [Ingredient.SodiumPercarbonate],
      new Date('2026-01-01'),
    );
    mockedLoad.mockResolvedValue(new Map([['TestBooster', booster]]));
    render(
      <MemoryRouter initialEntries={[`/boosters/compare?c=${booster.slug}`]}>
        <CompareBoosters />
      </MemoryRouter>,
    );

    expect(await screen.findByText('TestBrand')).toBeInTheDocument();
    expect(screen.getByText('Stain Fighter')).toBeInTheDocument();
  });
});
