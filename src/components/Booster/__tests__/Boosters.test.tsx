import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Boosters from '../Boosters';
import { loadBoosters } from '../data/boosters-data';
import { BoosterProfile } from '../types/BoosterProfile';
import { ProductType } from '../../common/product/types/ProductType';
import { DataSource } from '../../common/product/types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

jest.mock('../data/boosters-data');

const mockedLoad = loadBoosters as jest.MockedFunction<typeof loadBoosters>;

function makeBooster(): BoosterProfile {
  return new BoosterProfile(
    'Stain Fighter',
    'TestBrand',
    ProductType.Powder,
    DataSource.Package,
    [Ingredient.SodiumPercarbonate, Ingredient.Subtilisin],
    new Date('2026-01-01'),
  );
}

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
}

function renderBoosters() {
  return render(
    <MemoryRouter initialEntries={['/boosters']}>
      <Routes>
        <Route path="/boosters" element={<Boosters />} />
        <Route path="/boosters/compare" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Boosters', () => {
  it('renders the boosters heading', async () => {
    mockedLoad.mockResolvedValue(new Map());
    renderBoosters();
    expect(screen.getByRole('heading', { name: 'Boosters' })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading boosters...')).not.toBeInTheDocument());
  });

  it('shows an empty state when there are no boosters', async () => {
    mockedLoad.mockResolvedValue(new Map());
    renderBoosters();
    expect(await screen.findByText('No boosters yet.')).toBeInTheDocument();
  });

  it('renders a booster row and opens its detail card', async () => {
    const booster = makeBooster();
    mockedLoad.mockResolvedValue(new Map([['TestBooster', booster]]));
    renderBoosters();

    const nameButton = await screen.findByRole('button', { name: 'Stain Fighter' });
    fireEvent.click(nameButton);

    expect(await screen.findByRole('dialog', { name: 'TestBrand Stain Fighter' })).toBeInTheDocument();
  });

  it('navigates to the booster compare view', async () => {
    const booster = makeBooster();
    mockedLoad.mockResolvedValue(new Map([['TestBooster', booster]]));
    renderBoosters();

    fireEvent.click(await screen.findByRole('checkbox', { name: 'Select TestBrand Stain Fighter for comparison' }));
    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));

    expect(await screen.findByTestId('location')).toHaveTextContent(`/boosters/compare?c=${booster.slug}`);
  });
});
