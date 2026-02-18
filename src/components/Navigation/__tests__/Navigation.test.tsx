import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation', () => {
  it('renders the brand name', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    expect(screen.getByText('Laundry Product Database')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Detergents' })).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: 'Boosters' })).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: 'Pretreaters' })).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: 'Glossary' })).toBeInTheDocument();
  });

  it('navigation links have correct href attributes', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Detergents' })).toHaveAttribute('href', '/detergents');
    // expect(screen.getByRole('link', { name: 'Boosters' })).toHaveAttribute('href', '/boosters');
    // expect(screen.getByRole('link', { name: 'Pretreaters' })).toHaveAttribute('href', '/pretreaters');
    // expect(screen.getByRole('link', { name: 'Glossary' })).toHaveAttribute('href', '/glossary');
  });
});
