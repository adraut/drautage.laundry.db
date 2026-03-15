import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetergentDetailCard } from '../DetergentDetailCard';
import { DetergentProfile } from '../types/DetergentProfile';
import { DetergentType } from '../types/DetergentType';
import { Ingredient } from '../../common/types/Ingredient';

const makeDetergent = (overrides?: Partial<{ name: string; brand: string }>): DetergentProfile => {
  const d = new DetergentProfile(
    overrides?.name ?? 'Clean Breeze',
    overrides?.brand ?? 'Tide',
    DetergentType.Liquid,
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

    it('shows the Ingredients section heading', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(screen.getByText('Ingredients')).toBeInTheDocument();
    });

    it('renders ingredient names as human-readable text', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      // 'Protease' stays as-is (single capital word)
      expect(screen.getByText('Protease')).toBeInTheDocument();
      // 'SodiumLaurethSulfate' should be split
      expect(screen.getByText('Sodium Laureth Sulfate')).toBeInTheDocument();
    });

    it('shows the Details section with countries', () => {
      const detergent = makeDetergent();
      render(<DetergentDetailCard detergent={detergent} onClose={() => {}} />);

      expect(screen.getByText('Details')).toBeInTheDocument();
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
        [Ingredient.Water],
        new Date('2025-06-01'),
      );
      render(<DetergentDetailCard detergent={d} onClose={() => {}} />);

      expect(screen.getByText('—')).toBeInTheDocument();
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
