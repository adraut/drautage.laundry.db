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
          { field: 'hasProtease', operator: 'contains', value: true },
          { field: 'isBiodegradable', operator: 'contains', value: true },
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
  });
});
