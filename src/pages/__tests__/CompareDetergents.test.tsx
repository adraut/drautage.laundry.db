import { render, screen } from '@testing-library/react';
import CompareDetergents from '../CompareDetergents';

describe('CompareDetergents', () => {
  it('renders the compare detergents heading', () => {
    render(<CompareDetergents />);
    
    expect(screen.getByRole('heading', { name: 'Compare Detergents' })).toBeInTheDocument();
  });

  it('renders all detergent comparison cards', () => {
    render(<CompareDetergents />);
    
    expect(screen.getByRole('heading', { name: 'Tide Original' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Persil ProClean' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Gain Original' })).toBeInTheDocument();
  });

  it('renders product attributes', () => {
    render(<CompareDetergents />);
    
    // Check that attribute labels are present
    expect(screen.getAllByText(/Type:/)).toHaveLength(3);
    expect(screen.getAllByText(/Enzymes:/)).toHaveLength(3);
    expect(screen.getAllByText(/Fragrance:/)).toHaveLength(3);
    expect(screen.getAllByText(/HE Compatible:/)).toHaveLength(3);
    expect(screen.getAllByText(/Price Range:/)).toHaveLength(3);
  });
});
