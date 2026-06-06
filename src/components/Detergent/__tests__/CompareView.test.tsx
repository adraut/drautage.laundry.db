import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CompareView } from '../CompareView';
import { loadDetergents } from '../data/detergents-data';
import { DetergentProfile } from '../types/DetergentProfile';
import { DetergentType } from '../types/DetergentType';
import { DataSource } from '../types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

jest.mock('../data/detergents-data');

function makeDetergents(): Map<string, DetergentProfile> {
  const tide = new DetergentProfile(
    'Original',
    'Tide',
    DetergentType.Liquid,
    DataSource.Package,
    [Ingredient.Amylase, Ingredient.SodiumLaurylSulfate],
    new Date('2026-01-01'),
  );
  const persil = new DetergentProfile(
    'ProClean',
    'Persil',
    DetergentType.Liquid,
    DataSource.Package,
    [Ingredient.Amylase, Ingredient.Protease],
    new Date('2026-01-01'),
  );
  return new Map([
    ['tide-original-liquid-liquid', tide],
    ['persil-proclean-liquid-liquid', persil],
  ]);
}

function renderCompare(search = '') {
  const mockedLoad = loadDetergents as jest.MockedFunction<typeof loadDetergents>;
  mockedLoad.mockResolvedValue(makeDetergents());
  return render(
    <MemoryRouter initialEntries={[`/detergents/compare${search}`]}>
      <CompareView />
    </MemoryRouter>,
  );
}

describe('CompareView', () => {
  it('shows an empty state when no ?c= params are present', async () => {
    renderCompare();
    await waitFor(() => {
      expect(screen.getByText(/No products selected/i)).toBeInTheDocument();
    });
  });

  it('shows a back link', async () => {
    renderCompare();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /back to detergents/i })).toBeInTheDocument();
    });
  });

  it('renders product headers for matched slugs', async () => {
    renderCompare('?c=tide-original-liquid&c=persil-proclean-liquid');
    await waitFor(() => {
      expect(screen.getByText('Tide')).toBeInTheDocument();
      expect(screen.getByText('Persil')).toBeInTheDocument();
    });
  });

  it('renders category section headers', async () => {
    renderCompare('?c=tide-original-liquid&c=persil-proclean-liquid');
    await waitFor(() => {
      expect(screen.getByText('Enzymes')).toBeInTheDocument();
      expect(screen.getByText('Surfactants')).toBeInTheDocument();
    });
  });

  it('renders ingredient names in the table', async () => {
    renderCompare('?c=tide-original-liquid&c=persil-proclean-liquid');
    await waitFor(() => {
      expect(screen.getByText(Ingredient.Amylase)).toBeInTheDocument();
      expect(screen.getByText(Ingredient.SodiumLaurylSulfate)).toBeInTheDocument();
    });
  });

  it('renders Details section with data source and last updated rows', async () => {
    renderCompare('?c=tide-original-liquid');
    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Data source')).toBeInTheDocument();
      expect(screen.getByText('Last updated')).toBeInTheDocument();
    });
  });

  it('shows empty state when no slug matches a known profile', async () => {
    renderCompare('?c=unknown-detergent');
    await waitFor(() => {
      expect(screen.getByText(/No products selected/i)).toBeInTheDocument();
    });
  });
});
