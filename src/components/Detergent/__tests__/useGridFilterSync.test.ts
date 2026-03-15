import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useGridFilterSync } from '../hooks/useGridFilterSync';
import { encodeFilter, decodeFilter, getDefaultFilter } from '../utils/gridFilterUtils';
import { CompositeFilterDescriptor, FilterDescriptor } from '../utils/filterTypes';

beforeEach(() => {
  // Reset URL and mocks before each test
  window.history.pushState({}, '', 'http://localhost/');
  jest.clearAllMocks();
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  (console.warn as jest.Mock).mockRestore();
});

// Helper to render hook with Router context
const renderHookWithRouter = (callback: () => ReturnType<typeof useGridFilterSync>) => {
  return renderHook(() => callback(), {
    wrapper: ({ children }: { children: React.ReactNode }) => React.createElement(BrowserRouter, {}, children),
  });
};

describe('useGridFilterSync', () => {
  describe('initialization', () => {
    it('should return default filter when no URL params present', () => {
      const { result } = renderHookWithRouter(() => useGridFilterSync());

      expect(result.current.filter).toEqual(getDefaultFilter());
    });

    it('should load filter from URL param on mount', () => {
      const testFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [
          { field: 'hasProtease', operator: 'eq', value: true },
          { field: 'isBiodegradable', operator: 'eq', value: true },
        ],
      };

      const encoded = encodeFilter(testFilter);

      // Create a new URL with the filter params
      const params = new URLSearchParams();
      encoded.forEach((param) => {
        params.append('f', param);
      });
      const testUrl = `http://localhost/?${params.toString()}`;
      window.history.pushState({}, '', testUrl);

      const { result } = renderHookWithRouter(() => useGridFilterSync());

      expect(result.current.filter).toEqual(testFilter);
    });

    it('should fall back to default filter when no f params present', () => {
      const testUrl = 'http://localhost/?other=value';
      window.history.pushState({}, '', testUrl);

      const { result } = renderHookWithRouter(() => useGridFilterSync());

      expect(result.current.filter).toEqual(getDefaultFilter());
    });
  });

  describe('updateFilterInUrl', () => {
    it('should debounce and update URL when filter changes', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridFilterSync());

      const newFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasAmylase', operator: 'eq', value: true }],
      };

      act(() => {
        result.current.updateFilterInUrl(newFilter);
      });

      // URL should not be updated immediately (due to debounce)
      expect(window.location.search).toBe('');

      // Advance timers by 500ms (debounce delay)
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const url = new URL(window.location.href);
        const filterParams = url.searchParams.getAll('f');
        expect(filterParams.length).toBeGreaterThan(0);

        // Verify the URL params can be decoded back to our filter
        const decodedFilter = decodeFilter(filterParams);
        expect(decodedFilter).toEqual(newFilter);
      });

      jest.useRealTimers();
    });

    it('should cancel previous debounce when called multiple times', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridFilterSync());

      const filter1: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasProtease', operator: 'eq', value: true }],
      };

      const filter2: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasLipase', operator: 'eq', value: true }],
      };

      // Call updateFilterInUrl twice
      act(() => {
        result.current.updateFilterInUrl(filter1);
      });

      act(() => {
        jest.advanceTimersByTime(100);
      });

      act(() => {
        result.current.updateFilterInUrl(filter2);
      });

      // Advance by 400ms more (total 500ms from second call)
      act(() => {
        jest.advanceTimersByTime(400);
      });

      // Should have encoded filter2, not filter1
      await waitFor(() => {
        const url = new URL(window.location.href);
        const filterParams = url.searchParams.getAll('f');
        const decodedFilter = decodeFilter(filterParams);
        expect(decodedFilter).toEqual(filter2);
      });

      jest.useRealTimers();
    });

    it('should handle empty/null filters gracefully', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridFilterSync());

      const invalidFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [],
      };

      act(() => {
        result.current.updateFilterInUrl(invalidFilter);
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Empty filters are not encoded, so URL will be empty
      await waitFor(() => {
        const url = new URL(window.location.href);
        const filterParams = url.searchParams.getAll('f');
        // Empty filter array stays empty
        expect(filterParams.length).toBe(0);
      });

      jest.useRealTimers();
    });
  });

  describe('cleanup', () => {
    it('should clear debounce timer on unmount', () => {
      jest.useFakeTimers();

      const { unmount, result } = renderHookWithRouter(() => useGridFilterSync());

      const newFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasMannanase', operator: 'eq', value: true }],
      };

      act(() => {
        result.current.updateFilterInUrl(newFilter);
      });

      // Unmount before debounce completes
      unmount();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // URL should not be updated (timer was cleared on unmount)
      expect(window.location.search).toBe('');

      jest.useRealTimers();
    });
  });

  describe('roundtrip encoding/decoding', () => {
    it('should correctly encode and decode complex filters', () => {
      const complexFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [
          { field: 'brand', operator: 'contains', value: 'Tide' },
          { field: 'hasProtease', operator: 'eq', value: true },
          { field: 'type', operator: 'eq', value: 'liquid' },
          { field: 'isBiodegradable', operator: 'eq', value: false },
        ],
      };

      const encoded = encodeFilter(complexFilter);
      const decoded = decodeFilter(encoded);

      expect(decoded).toEqual(complexFilter);
    });

    it('should produce different encoded strings for different filters', () => {
      const filter1: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasLipase', operator: 'eq', value: true }],
      };

      const filter2: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasProtease', operator: 'eq', value: true }],
      };

      const encoded1 = encodeFilter(filter1);
      const encoded2 = encodeFilter(filter2);

      expect(encoded1).not.toEqual(encoded2);
    });

    it('should produce URL-safe encoded strings with repeating params', () => {
      const filter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [
          { field: 'hasLipase', operator: 'eq', value: true },
          { field: 'brand', operator: 'contains', value: 'Tide' },
        ],
      };

      const encoded = encodeFilter(filter);

      // Should be an array with field names and field:value pairs
      expect(Array.isArray(encoded)).toBe(true);
      expect(encoded).toContain('hasLipase'); // Boolean true = just field name
      expect(encoded).toContain('brand:Tide'); // Non-boolean = field:value
    });

    it('should auto-detect operators when decoding', () => {
      // hasLipase is a boolean, so should get 'eq' operator
      const booleanFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasLipase', operator: 'eq', value: true }],
      };

      const encoded = encodeFilter(booleanFilter);
      const decoded = decodeFilter(encoded);

      expect(decoded).toEqual(booleanFilter);
      const firstFilter = decoded?.filters[0] as FilterDescriptor;
      expect(firstFilter.operator).toBe('eq');
    });

    it('should use contains operator for text fields', () => {
      const textFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'brand', operator: 'contains', value: 'Tide' }],
      };

      const encoded = encodeFilter(textFilter);
      const decoded = decodeFilter(encoded);

      expect(decoded).toEqual(textFilter);
      const firstFilter = decoded?.filters[0] as FilterDescriptor;
      expect(firstFilter.operator).toBe('contains');
    });
  });
});
