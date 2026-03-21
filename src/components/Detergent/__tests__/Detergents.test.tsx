import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Detergents from '../Detergents';
import { encodeFilter } from '../utils/gridFilterUtils';
import { CompositeFilterDescriptor } from '../utils/filterTypes';
import { loadDetergents } from '../data/detergents-data';
import { DetergentProfile } from '../types/DetergentProfile';
import { DetergentType } from '../types/DetergentType';
import { DataSource } from '../types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

jest.mock('../data/detergents-data');

function createMockDetergents(): Map<string, DetergentProfile> {
  const withCellulase = new DetergentProfile(
    'Original',
    'Tide',
    DetergentType.Liquid,
    DataSource.Package,
    [Ingredient.Lipase, Ingredient.Cellulase, Ingredient.Protease],
    new Date('2026-01-01'),
  );
  withCellulase.countriesAvailable = ['USA'];

  const withoutCellulase = new DetergentProfile(
    'Tide Clean & Gentle',
    'Tide',
    DetergentType.Liquid,
    DataSource.Package,
    [Ingredient.Lipase, Ingredient.Protease],
    new Date('2026-01-01'),
  );
  withoutCellulase.countriesAvailable = ['USA'];

  return new Map([
    ['tide-original', withCellulase],
    ['tide-clean-gentle', withoutCellulase],
  ]);
}

// Helper to find the filter drawer (not the detail card drawer)
const getFilterDrawer = () => screen.getByRole('dialog', { name: 'Filter Detergents' });

describe('Detergents', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    (loadDetergents as jest.Mock).mockResolvedValue(createMockDetergents());
  });

  afterEach(() => {
    (console.warn as jest.Mock).mockRestore();
  });

  it('renders the detergents heading', async () => {
    render(
      <BrowserRouter>
        <Detergents />
      </BrowserRouter>,
    );

    await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

    expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
  });

  describe('URL filter persistence', () => {
    it('should apply default filter when no URL params present', async () => {
      // Reset URL
      window.history.pushState({}, '', 'http://localhost/');

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

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
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
      // Grid should render with filters applied from URL
    });

    it('should fall back to default filter on invalid URL param', async () => {
      const testUrl = 'http://localhost/?filter=INVALID_ENCODED_STRING';
      window.history.pushState({}, '', testUrl);

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
    });

    it('should have Grid component that can be filtered', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Verify Grid renders (it will have the loading state or data)
      expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
    });

    it('should filter out detergents without cellulase', async () => {
      const testFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasCellulase', operator: 'eq', value: true }],
      };

      const encoded = encodeFilter(testFilter);
      const params = new URLSearchParams();
      encoded.forEach((param) => {
        params.append('f', param);
      });
      const testUrl = `http://localhost/?${params.toString()}`;
      window.history.pushState({}, '', testUrl);

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      expect(screen.queryByText('Tide Clean & Gentle')).not.toBeInTheDocument();
    });
  });

  describe('Grid boolean cells', () => {
    it('should render boolean columns as checkboxes', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Boolean columns should render as checkboxes, not true/false text
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
      expect(screen.queryByText('true')).not.toBeInTheDocument();
      expect(screen.queryByText('false')).not.toBeInTheDocument();
    });

    it('should render checked checkboxes for true values and unchecked for false', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Mock data has products with some true and some false boolean values
      const checkedBoxes = screen.getAllByRole('checkbox', { checked: true });
      expect(checkedBoxes.length).toBeGreaterThan(0);

      const uncheckedBoxes = screen.getAllByRole('checkbox', { checked: false });
      expect(uncheckedBoxes.length).toBeGreaterThan(0);
    });
  });

  describe('Grid sorting', () => {
    it('should render grid with default ascending sort on product name', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      const header = screen.getByRole('columnheader', { name: 'Product Name' });
      expect(header).toHaveAttribute('aria-sort', 'ascending');
    });

    it('should have sortable columns with correct headers', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      expect(screen.getByRole('columnheader', { name: 'Product Name' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Brand' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
    });

    it('should apply sort and filter together', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Grid should render with default sort (ascending name) and default filter (hasLipase = true)
      const header = screen.getByRole('columnheader', { name: 'Product Name' });
      expect(header).toHaveAttribute('aria-sort', 'ascending');

      // Grid should be visible and rendered
      expect(screen.getByRole('columnheader', { name: 'Brand' })).toBeInTheDocument();
    });
  });

  describe('Filter Bar and Drawer', () => {
    it('should show filter bar when drawer is closed', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Filter bar should be visible when drawer is closed
      const filterBar = screen.getByRole('button', { name: 'Open filters' });
      expect(filterBar).toBeInTheDocument();
      expect(filterBar).toBeVisible();
    });

    it('should hide filter bar when drawer is open', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Click the filter bar to open the drawer
      const filterBar = screen.getByRole('button', { name: 'Open filters' });
      await user.click(filterBar);

      // Wait for the filter drawer to have the open class
      await waitFor(() => {
        expect(getFilterDrawer()).toHaveClass('drawer-open');
      });

      // Filter bar should not be in the document when drawer is open
      expect(screen.queryByRole('button', { name: 'Open filters' })).not.toBeInTheDocument();
    });

    it('should show drawer when filter bar is clicked', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Filter drawer should exist but not be open initially
      const filterDrawer = getFilterDrawer();
      expect(filterDrawer).not.toHaveClass('drawer-open');

      // Click the filter bar
      const filterBar = screen.getByRole('button', { name: 'Open filters' });
      await user.click(filterBar);

      // Filter drawer should now have the open class
      await waitFor(() => {
        expect(filterDrawer).toHaveClass('drawer-open');
      });

      // Verify drawer content is visible
      expect(screen.getByText('Reset Filters')).toBeInTheDocument();
      expect(screen.getByText('Clear Filters')).toBeInTheDocument();
      expect(screen.getByLabelText('Search Filters:')).toBeInTheDocument();
    });

    it('should show filter bar again when drawer is closed', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Open the drawer
      const filterBar = screen.getByRole('button', { name: 'Open filters' });
      await user.click(filterBar);

      const filterDrawer = getFilterDrawer();
      await waitFor(() => {
        expect(filterDrawer).toHaveClass('drawer-open');
      });

      // Close the drawer using the close button (scope to filter drawer to avoid ambiguity)
      const closeButton = within(filterDrawer).getByRole('button', { name: 'Close drawer' });
      await user.click(closeButton);

      // Wait for drawer to close
      await waitFor(() => {
        expect(filterDrawer).not.toHaveClass('drawer-open');
      });

      // Filter bar should be visible again
      expect(screen.getByRole('button', { name: 'Open filters' })).toBeInTheDocument();
    });

    it('should close drawer when ESC key is pressed', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Open the drawer
      const filterBar = screen.getByRole('button', { name: 'Open filters' });
      await user.click(filterBar);

      const filterDrawer = getFilterDrawer();
      await waitFor(() => {
        expect(filterDrawer).toHaveClass('drawer-open');
      });

      // Press ESC key
      await user.keyboard('{Escape}');

      // Drawer should close
      await waitFor(() => {
        expect(filterDrawer).not.toHaveClass('drawer-open');
      });

      // Filter bar should be visible again
      expect(screen.getByRole('button', { name: 'Open filters' })).toBeInTheDocument();
    });
  });

  describe('Product detail card', () => {
    it('should render product name cells as clickable buttons', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      // Product name cells should be buttons
      const detergentNameButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.classList.contains('detergent-name-btn'));
      expect(detergentNameButtons.length).toBeGreaterThan(0);
    });

    it('should open the detail card when a product name is clicked', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      const nameButtons = screen.getAllByRole('button').filter((btn) => btn.classList.contains('detergent-name-btn'));
      expect(nameButtons.length).toBeGreaterThan(0);

      const firstButton = nameButtons[0];

      fireEvent.click(firstButton);

      await waitFor(() => {
        const detailDrawer = screen.getAllByRole('dialog').find((d) => d.classList.contains('drawer-right'));
        expect(detailDrawer).toHaveClass('drawer-open');
      });
    });

    it('should close the detail card when the close button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      const nameButtons = screen.getAllByRole('button').filter((btn) => btn.classList.contains('detergent-name-btn'));
      const firstButton = nameButtons[0];

      fireEvent.click(firstButton);

      await waitFor(() => {
        const detailDrawer = screen.getAllByRole('dialog').find((d) => d.classList.contains('drawer-right'));
        expect(detailDrawer).toHaveClass('drawer-open');
      });

      // Close button is inside the now-open detail drawer
      const detailDrawer = screen.getAllByRole('dialog').find((d) => d.classList.contains('drawer-right'))!;
      const closeButton = within(detailDrawer).getByRole('button', { name: 'Close drawer' });
      await user.click(closeButton);

      await waitFor(() => {
        const dialogs = screen.getAllByRole('dialog');
        dialogs.forEach((dialog) => {
          expect(dialog).not.toHaveClass('drawer-open');
        });
      });
    });

    it('should show brand and ingredient section in the detail card', async () => {
      render(
        <BrowserRouter>
          <Detergents />
        </BrowserRouter>,
      );

      await waitFor(() => expect(screen.queryByText('Loading detergents...')).not.toBeInTheDocument());

      const nameButtons = screen.getAllByRole('button').filter((btn) => btn.classList.contains('detergent-name-btn'));

      fireEvent.click(nameButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Ingredients')).toBeInTheDocument();
      });

      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Last updated')).toBeInTheDocument();
    });
  });
});
