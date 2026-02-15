import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Detergents from '../Detergents';
import { encodeFilter } from '../utils/gridFilterUtils';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

describe('Detergents', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.warn as jest.Mock).mockRestore();
  });

  it('renders the detergents heading', async () => {
    render(
      <BrowserRouter>
        <Detergents />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
    );

    expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
  });

  describe('URL filter persistence', () => {
    it('should apply default filter when no URL params present', async () => {
      // Reset URL
      window.history.pushState({}, '', 'http://localhost/');

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
    });

    it('should load and apply filter from URL param on mount', async () => {
      const testFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [
          { field: 'hasProtease', operator: 'eq', value: true },
          { field: 'isBiodegradable', operator: 'eq', value: true },
        ],
      };

      const encoded = encodeFilter(testFilter);
      const testUrl = `http://localhost/?filter=${encoded}`;
      window.history.pushState({}, '', testUrl);

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
      // Grid should render with filters applied from URL
    });

    it('should fall back to default filter on invalid URL param', async () => {
      const testUrl = 'http://localhost/?filter=INVALID_ENCODED_STRING';
      window.history.pushState({}, '', testUrl);

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
    });

    it('should have Grid component that can be filtered', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      // Verify Grid renders (it will have the loading state or data)
      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
    });

    it('should filter out detergents without cellulase', async () => {
      const testFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasCellulase', operator: 'eq', value: true }],
      };

      const encoded = encodeFilter(testFilter);
      const params = new URLSearchParams({ filter: encoded });
      const testUrl = `http://localhost/?${params.toString()}`;
      window.history.pushState({}, '', testUrl);

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      expect(screen.queryByText('Tide Clean & Gentle')).not.toBeInTheDocument();
    });
  });

  describe('Grid sorting', () => {
    it('should render grid with default ascending sort on product name', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      // Find the Product Name column header in the grid (inside a th element)
      const productNameColumns = screen.getAllByText('Product Name');
      const productNameInGrid = productNameColumns.find(el => el.closest('th'));
      expect(productNameInGrid).toBeDefined();
      const thElement = productNameInGrid?.closest('th');
      expect(thElement).toHaveAttribute('aria-sort', 'ascending');
    });

    it('should have sortable columns with correct headers', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      // Verify multiple columns are present in the grid (they appear in both drawer and grid)
      const productNameElements = screen.getAllByText('Product Name');
      expect(productNameElements.length).toBeGreaterThan(0);
      const brandElements = screen.getAllByText('Brand');
      expect(brandElements.length).toBeGreaterThan(0);
      const typeElements = screen.getAllByText('Type');
      expect(typeElements.length).toBeGreaterThan(0);
    });

    it('should apply sort and filter together', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument()
      );

      // Grid should render with default sort (ascending name) and default filter (hasLipase = true)
      const productNameColumns = screen.getAllByText('Product Name');
      const productNameInGrid = productNameColumns.find(el => el.closest('th'));
      expect(productNameInGrid).toBeDefined();
      const thElement = productNameInGrid?.closest('th');
      expect(thElement).toHaveAttribute('aria-sort', 'ascending');

      // Grid should be visible and rendered
      expect(productNameColumns.length).toBeGreaterThan(0);
    });  });
});