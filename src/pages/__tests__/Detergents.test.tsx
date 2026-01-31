import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Detergents from '../Detergents';

describe('Detergents', () => {
  it('renders the detergents heading', () => {
    render(
      <BrowserRouter>
        <Detergents />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
  });

  it('renders all detergent products', () => {
    render(
      <BrowserRouter>
        <Detergents />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('heading', { name: 'Tide Original' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Persil ProClean' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Gain Original' })).toBeInTheDocument();
  });

  it('renders product descriptions', () => {
    render(
      <BrowserRouter>
        <Detergents />
      </BrowserRouter>
    );
    
    expect(screen.getByText('A powerful cleaning formula for everyday laundry needs.')).toBeInTheDocument();
    expect(screen.getByText('Deep cleaning power with stain-fighting enzymes.')).toBeInTheDocument();
    expect(screen.getByText('Fresh scent with effective stain removal.')).toBeInTheDocument();
  });

  it('renders compare button', () => {
    render(
      <BrowserRouter>
        <Detergents />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: 'Compare Detergents Side by Side' })).toBeInTheDocument();
  });
});
