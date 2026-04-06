import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../context/ThemeContext';
import Navigation from '../Navigation';

function renderWithProviders(storedTheme?: 'light' | 'dark') {
  if (storedTheme) localStorage.setItem('theme', storedTheme);
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </BrowserRouter>,
  );
}

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

describe('Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
    mockMatchMedia(false);
  });

  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

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

  describe('theme toggle button', () => {
    it('shows moon icon and aria-label for dark mode when theme is light', () => {
      renderWithProviders('light');
      const btn = screen.getByRole('button', { name: 'Switch to dark mode' });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('☾');
    });

    it('shows sun icon and aria-label for light mode when theme is dark', () => {
      renderWithProviders('dark');
      const btn = screen.getByRole('button', { name: 'Switch to light mode' });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('☀');
    });

    it('switches to dark mode when toggle is clicked in light mode', async () => {
      const user = userEvent.setup();
      renderWithProviders('light');

      await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));

      expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
    });

    it('switches to light mode when toggle is clicked in dark mode', async () => {
      const user = userEvent.setup();
      renderWithProviders('dark');

      await user.click(screen.getByRole('button', { name: 'Switch to light mode' }));

      expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
    });
  });
});
