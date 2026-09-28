import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useGridSortSync } from '../hooks/useGridSortSync';
import { useGridFilterSync } from '../hooks/useGridFilterSync';
import { encodeSort, decodeSort, getDefaultSort } from '../utils/gridSortUtils';
import type { SortModelItem } from '../utils/gridSortUtils';
import type { CompositeFilterDescriptor } from '../utils/filterTypes';

beforeEach(() => {
  window.history.pushState({}, '', 'http://localhost/');
  jest.clearAllMocks();
});

const renderHookWithRouter = (callback: () => ReturnType<typeof useGridSortSync>) => {
  return renderHook(() => callback(), {
    wrapper: ({ children }: { children: React.ReactNode }) => React.createElement(BrowserRouter, {}, children),
  });
};

describe('useGridSortSync', () => {
  describe('initialization', () => {
    it('returns default sort when no URL params present', () => {
      const { result } = renderHookWithRouter(() => useGridSortSync());
      expect(result.current.sortModel).toEqual(getDefaultSort());
    });

    it('loads sort model from URL params on mount', () => {
      const model: SortModelItem[] = [
        { colId: 'name', sort: 'desc' },
        { colId: 'brand', sort: 'asc' },
      ];
      const params = new URLSearchParams();
      encodeSort(model).forEach((p) => params.append('s', p));
      window.history.pushState({}, '', `http://localhost/?${params.toString()}`);

      const { result } = renderHookWithRouter(() => useGridSortSync());
      expect(result.current.sortModel).toEqual(model);
    });

    it('falls back to default when s params are invalid', () => {
      window.history.pushState({}, '', 'http://localhost/?s=brand:invalid');
      const { result } = renderHookWithRouter(() => useGridSortSync());
      expect(result.current.sortModel).toEqual(getDefaultSort());
    });

    it('falls back to default when no s params but other params exist', () => {
      window.history.pushState({}, '', 'http://localhost/?f=hasLipase');
      const { result } = renderHookWithRouter(() => useGridSortSync());
      expect(result.current.sortModel).toEqual(getDefaultSort());
    });
  });

  describe('updateSortInUrl', () => {
    it('debounces and updates URL after 500ms', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridSortSync());

      const newSort: SortModelItem[] = [{ colId: 'type', sort: 'desc' }];

      act(() => {
        result.current.updateSortInUrl(newSort);
      });

      // Not updated yet
      expect(window.location.search).toBe('');

      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const params = new URL(window.location.href).searchParams.getAll('s');
        expect(params.length).toBeGreaterThan(0);
        expect(decodeSort(params)).toEqual(newSort);
      });

      jest.useRealTimers();
    });

    it('cancels previous debounce when called again', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridSortSync());

      const sort1: SortModelItem[] = [{ colId: 'brand', sort: 'asc' }];
      const sort2: SortModelItem[] = [{ colId: 'name', sort: 'desc' }];

      act(() => {
        result.current.updateSortInUrl(sort1);
      });
      act(() => {
        jest.advanceTimersByTime(200);
      });
      act(() => {
        result.current.updateSortInUrl(sort2);
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const params = new URL(window.location.href).searchParams.getAll('s');
        expect(decodeSort(params)).toEqual(sort2);
      });

      jest.useRealTimers();
    });

    it('preserves existing filter params when updating sort', async () => {
      jest.useFakeTimers();

      window.history.pushState({}, '', 'http://localhost/?f=hasLipase');

      const { result } = renderHookWithRouter(() => useGridSortSync());

      act(() => {
        result.current.updateSortInUrl([{ colId: 'brand', sort: 'asc' }]);
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const url = new URL(window.location.href);
        expect(url.searchParams.getAll('f')).toContain('hasLipase');
        expect(url.searchParams.getAll('s')).toContain('brand:asc');
      });

      jest.useRealTimers();
    });

    it('does not write s params to URL when sort equals default', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridSortSync());

      act(() => {
        result.current.updateSortInUrl(getDefaultSort());
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const params = new URL(window.location.href).searchParams.getAll('s');
        expect(params).toHaveLength(0);
      });

      jest.useRealTimers();
    });

    it('removes s params from URL when sort is reset to default', async () => {
      jest.useFakeTimers();

      window.history.pushState({}, '', 'http://localhost/?s=type:desc');

      const { result } = renderHookWithRouter(() => useGridSortSync());

      act(() => {
        result.current.updateSortInUrl(getDefaultSort());
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const params = new URL(window.location.href).searchParams.getAll('s');
        expect(params).toHaveLength(0);
      });

      jest.useRealTimers();
    });

    it('replaces previous sort params rather than appending', async () => {
      jest.useFakeTimers();

      window.history.pushState({}, '', 'http://localhost/?s=brand:asc&s=name:asc');

      const { result } = renderHookWithRouter(() => useGridSortSync());

      act(() => {
        result.current.updateSortInUrl([{ colId: 'type', sort: 'desc' }]);
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const params = new URL(window.location.href).searchParams.getAll('s');
        expect(params).toEqual(['type:desc']);
      });

      jest.useRealTimers();
    });
  });

  describe('sort stability when unrelated params change', () => {
    it('does not return a new sortModel object when filter params are added', () => {
      const model: SortModelItem[] = [{ colId: 'name', sort: 'desc' }];
      const params = new URLSearchParams();
      encodeSort(model).forEach((p) => params.append('s', p));
      window.history.pushState({}, '', `http://localhost/?${params.toString()}`);

      const { result } = renderHook(() => ({ sort: useGridSortSync(), filter: useGridFilterSync() }), {
        wrapper: ({ children }: { children: React.ReactNode }) => React.createElement(BrowserRouter, {}, children),
      });

      const sortBefore = result.current.sort.sortModel;

      const newFilter: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{ field: 'hasLipase', operator: 'eq', value: true }],
      };
      act(() => {
        result.current.filter.resetFilterInUrl(newFilter);
      });

      expect(result.current.sort.sortModel).toBe(sortBefore);
    });

    it('does not return a new sortModel object when filter params are removed', () => {
      const model: SortModelItem[] = [{ colId: 'brand', sort: 'asc' }];
      const filterParams = new URLSearchParams();
      encodeSort(model).forEach((p) => filterParams.append('s', p));
      filterParams.append('f', 'hasProtease');
      window.history.pushState({}, '', `http://localhost/?${filterParams.toString()}`);

      const { result } = renderHook(() => ({ sort: useGridSortSync(), filter: useGridFilterSync() }), {
        wrapper: ({ children }: { children: React.ReactNode }) => React.createElement(BrowserRouter, {}, children),
      });

      const sortBefore = result.current.sort.sortModel;

      act(() => {
        result.current.filter.resetFilterInUrl({ logic: 'and', filters: [] });
      });

      expect(result.current.sort.sortModel).toBe(sortBefore);
    });

    it('does return a new sortModel object when sort params change', () => {
      const model: SortModelItem[] = [{ colId: 'name', sort: 'desc' }];
      const params = new URLSearchParams();
      encodeSort(model).forEach((p) => params.append('s', p));
      window.history.pushState({}, '', `http://localhost/?${params.toString()}`);

      const { result } = renderHook(() => ({ sort: useGridSortSync(), filter: useGridFilterSync() }), {
        wrapper: ({ children }: { children: React.ReactNode }) => React.createElement(BrowserRouter, {}, children),
      });

      const sortBefore = result.current.sort.sortModel;

      const newSort: SortModelItem[] = [{ colId: 'brand', sort: 'asc' }];
      act(() => {
        result.current.sort.resetSortInUrl(newSort);
      });

      expect(result.current.sort.sortModel).not.toBe(sortBefore);
      expect(result.current.sort.sortModel).toEqual(newSort);
    });
  });

  describe('cleanup', () => {
    it('clears debounce timer on unmount', () => {
      jest.useFakeTimers();

      const { unmount, result } = renderHookWithRouter(() => useGridSortSync());

      act(() => {
        result.current.updateSortInUrl([{ colId: 'brand', sort: 'asc' }]);
      });

      unmount();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // URL not updated after unmount
      expect(window.location.search).toBe('');

      jest.useRealTimers();
    });
  });

  describe('roundtrip via URL', () => {
    it('encodes and decodes multi-column sort through URL', async () => {
      jest.useFakeTimers();

      const { result } = renderHookWithRouter(() => useGridSortSync());

      const model: SortModelItem[] = [
        { colId: 'brand', sort: 'asc' },
        { colId: 'name', sort: 'desc' },
        { colId: 'type', sort: 'asc' },
      ];

      act(() => {
        result.current.updateSortInUrl(model);
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const params = new URL(window.location.href).searchParams.getAll('s');
        expect(decodeSort(params)).toEqual(model);
      });

      jest.useRealTimers();
    });
  });
});
