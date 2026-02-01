import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home', () => {
  it('renders the welcome heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Welcome to the Laundry Product Database' })).toBeInTheDocument();
  });

  it('renders all product category cards', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Detergents' })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: 'Boosters' })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: 'Pretreaters' })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: 'Glossary' })).toBeInTheDocument();
  });

  it('renders view buttons for each category', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: 'View Detergents' })).toBeInTheDocument();
    //   expect(screen.getByRole('button', { name: 'View Boosters' })).toBeInTheDocument();
    //   expect(screen.getByRole('button', { name: 'View Pretreaters' })).toBeInTheDocument();
    //   expect(screen.getByRole('button', { name: 'View Glossary' })).toBeInTheDocument();
  });

  // it('renders compare products section', () => {
  //   render(
  //     <BrowserRouter>
  //       <Home />
  //     </BrowserRouter>
  //   );

  //   expect(screen.getByRole('heading', { name: 'Compare Products' })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: 'Compare Detergents' })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: 'Compare Boosters' })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: 'Compare Pretreaters' })).toBeInTheDocument();
  // });
});
