import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetergentDetailCard } from '../DetergentDetailCard';
import { DetergentProfile } from '../types/DetergentProfile';
import { DetergentType } from '../types/DetergentType';
import { DataSource } from '../types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

const makeDetergent = (overrides?: Partial<{ name: string; brand: string }>): DetergentProfile => {
  const d = new DetergentProfile(
    overrides?.name ?? 'Clean Breeze',
    overrides?.brand ?? 'Tide',
    DetergentType.Liquid,
    DataSource.Package,
    [Ingredient.Protease, Ingredient.Lipase, Ingredient.SodiumLaurethSulfate],
    new Date('2026-01-15'),
  );
  d.countriesAvailable = ['USA', 'CAN'];
  return d;
};

describe('DetergentDetailCard', () => {
  describe('when detergent is null', () => {
    it('renders a closed drawer', () => {
      const onClose = jest.fn();
      render(<DetergentDetailCard detergent={null} onClose={onClose} />);

      const drawer = screen.getByRole('dialog');
      expect(drawer).not.toHaveClass('drawer-open');
    });
  });

  describe('when detergent is provided', () => {
    it('renders an open drawer with the product name as title', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      const drawer = screen.getByRole('dialog', { name: 'Tide Clean Breeze' });
      expect(drawer).toHaveClass('drawer-open');
    });

    it('renders the drawer on the right side', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      const drawer = screen.getByRole('dialog');
      expect(drawer).toHaveClass('drawer-right');
    });

    it('renders the ingredients section', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(document.getElementById('ingredients-section')).toBeInTheDocument();
    });

    it('renders ingredient names as human-readable text', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      // 'Protease' stays as-is (single capital word)
      expect(screen.getByText('Protease')).toBeInTheDocument();
      // 'SodiumLaurethSulfate' should be split
      expect(screen.getByText('Sodium Laureth Sulfate')).toBeInTheDocument();
    });

    it('renders the ingredient table with Ingredient and Function column headers', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(screen.getByRole('columnheader', { name: 'Ingredient' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Function' })).toBeInTheDocument();
    });

    it('shows the category label in the Function column for a categorized ingredient', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      // Protease is in Enzymes → "Enzyme"
      const proteaseCell = screen.getByText('Protease').closest('tr');
      expect(proteaseCell).toHaveTextContent('Enzyme');

      // SodiumLaurethSulfate is in AnionicSurfactants → "Anionic Surfactant"
      const slsCell = screen.getByText('Sodium Laureth Sulfate').closest('tr');
      expect(slsCell).toHaveTextContent('Anionic Surfactant');
    });

    it('shows context-rule-added categories alongside base categories in the Function column', () => {
      // C16_18FattyAcidsSodiumSalt is Soap + Processing Aid by default.
      // With SodiumPolyacrylate preceding it, the context rule adds Suds Reducer.
      const d = new DetergentProfile(
        'Powder Test',
        'Brand',
        DetergentType.Powder,
        DataSource.Package,
        [Ingredient.SodiumPolyacrylate, Ingredient.C16_18FattyAcidsSodiumSalt],
        new Date('2026-01-01'),
      );
      render(<DetergentDetailCard detergent={d} onClose={() => {}} />);

      const fattyAcidRow = screen.getByText('C16-18 fatty acids sodium salt').closest('tr');
      expect(fattyAcidRow).toHaveTextContent('Soap');
      expect(fattyAcidRow).toHaveTextContent('Suds Reducer');
    });

    it('shows a dash in the Function column for an uncategorized ingredient', () => {
      const d = new DetergentProfile(
        'Uncategorized Test',
        'Brand',
        DetergentType.Liquid,
        DataSource.Package,
        [Ingredient.Water],
        new Date('2026-01-01'),
      );
      render(<DetergentDetailCard detergent={d} onClose={() => {}} />);

      const waterCell = screen.getByText('Water').closest('tr');
      expect(waterCell).toHaveTextContent('—');
    });

    it('shows the details section with countries', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(document.getElementById('details-section')).toBeInTheDocument();
      expect(screen.getByText('Countries')).toBeInTheDocument();
      // i18n-iso-countries should resolve 'USA' → 'United States of America'
      const countriesValue = screen.getByText(/United States/);
      expect(countriesValue).toBeInTheDocument();
    });

    it('shows the last updated date', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(screen.getByText('Last updated')).toBeInTheDocument();
      expect(screen.getByText('2026-01-15')).toBeInTheDocument();
    });

    it('shows a dash for countries when none are set', () => {
      const d = new DetergentProfile(
        'No Country',
        'Brand',
        DetergentType.Powder,
        DataSource.Package,
        [Ingredient.Water],
        new Date('2025-06-01'),
      );
      render(<DetergentDetailCard detergent={d} onClose={() => {}} />);

      const countriesValue = screen.getByText('Countries').nextElementSibling;
      expect(countriesValue).toHaveTextContent('—');
    });
  });

  describe('copy link button', () => {
    it('renders the copy link button when a detergent is provided', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(screen.getByRole('button', { name: 'Copy link to this product' })).toBeInTheDocument();
    });

    it('does not render the copy link button when detergent is null', () => {
      render(<DetergentDetailCard detergent={null} onClose={() => {}} />);

      expect(screen.queryByRole('button', { name: 'Copy link to this product' })).not.toBeInTheDocument();
    });

    it('copies window.location.href to clipboard when clicked', async () => {
      // userEvent.setup() automatically stubs navigator.clipboard
      const user = userEvent.setup();
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      const copyBtn = screen.getByRole('button', { name: 'Copy link to this product' });
      await user.click(copyBtn);

      const expectedUrl = new URL(window.location.pathname, window.location.origin);
      expectedUrl.searchParams.set('d', 'tide-clean-breeze-liquid');
      expect(await navigator.clipboard.readText()).toBe(expectedUrl.toString());
    });

    it('shows the copied state briefly after clicking', async () => {
      const user = userEvent.setup();
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      const copyBtn = screen.getByRole('button', { name: 'Copy link to this product' });
      expect(copyBtn).toHaveTextContent('⎘');

      await user.click(copyBtn);

      await waitFor(() => expect(copyBtn).toHaveTextContent('✓'));
    });
  });

  describe('closing the drawer', () => {
    it('calls onClose when the close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const detergent = makeDetergent();

      render(<DetergentDetailCard detergent={detergent} onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: 'Close drawer' });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the backdrop is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const detergent = makeDetergent();

      render(<DetergentDetailCard detergent={detergent} onClose={onClose} />);

      const backdrop = document.querySelector('.drawer-backdrop') as Element;
      expect(backdrop).toBeInTheDocument();
      await user.click(backdrop);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape is pressed', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const detergent = makeDetergent();

      render(<DetergentDetailCard detergent={detergent} onClose={onClose} />);

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
