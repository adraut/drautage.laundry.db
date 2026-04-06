import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../ThemeContext';

function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </>
  );
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeDisplay />
    </ThemeProvider>,
  );
}

function mockMatchMedia(matches: boolean, addEventListenerFn = jest.fn()) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: addEventListenerFn,
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

beforeEach(() => {
  localStorage.clear();
  mockMatchMedia(false);
});

afterEach(() => {
  delete document.documentElement.dataset.theme;
});

describe('ThemeContext', () => {
  describe('initial theme', () => {
    it('defaults to light when OS prefers light and no localStorage', () => {
      mockMatchMedia(false);
      renderWithProvider();
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('defaults to dark when OS prefers dark and no localStorage', () => {
      mockMatchMedia(true);
      renderWithProvider();
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('uses stored dark preference from localStorage over OS light preference', () => {
      localStorage.setItem('theme', 'dark');
      mockMatchMedia(false);
      renderWithProvider();
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('uses stored light preference from localStorage over OS dark preference', () => {
      localStorage.setItem('theme', 'light');
      mockMatchMedia(true);
      renderWithProvider();
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });
  });

  describe('document.documentElement.dataset.theme sync', () => {
    it('sets data-theme attribute to light on mount', () => {
      mockMatchMedia(false);
      renderWithProvider();
      expect(document.documentElement.dataset.theme).toBe('light');
    });

    it('sets data-theme attribute to dark on mount when OS prefers dark', () => {
      mockMatchMedia(true);
      renderWithProvider();
      expect(document.documentElement.dataset.theme).toBe('dark');
    });

    it('updates data-theme attribute when theme is toggled', async () => {
      const user = userEvent.setup();
      mockMatchMedia(false);
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(document.documentElement.dataset.theme).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('switches from light to dark', async () => {
      const user = userEvent.setup();
      mockMatchMedia(false);
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('switches from dark to light', async () => {
      const user = userEvent.setup();
      localStorage.setItem('theme', 'dark');
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('persists dark theme to localStorage after toggling from light', async () => {
      const user = userEvent.setup();
      mockMatchMedia(false);
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('persists light theme to localStorage after toggling from dark', async () => {
      const user = userEvent.setup();
      localStorage.setItem('theme', 'dark');
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  describe('OS preference change detection', () => {
    it('updates theme when OS switches to dark and no localStorage preference is set', () => {
      let capturedHandler: ((e: MediaQueryListEvent) => void) | null = null;
      const addEventListener = jest.fn((_, handler) => {
        capturedHandler = handler;
      });
      mockMatchMedia(false, addEventListener);

      renderWithProvider();
      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      act(() => {
        capturedHandler!({ matches: true } as MediaQueryListEvent);
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('does not register an OS change listener when a localStorage preference is stored', () => {
      localStorage.setItem('theme', 'light');
      const addEventListener = jest.fn();
      mockMatchMedia(false, addEventListener);

      renderWithProvider();

      expect(addEventListener).not.toHaveBeenCalled();
    });
  });
});
