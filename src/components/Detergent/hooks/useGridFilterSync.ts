import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GridFilter, encodeFilter, decodeFilter, getDefaultFilter } from '../utils/gridFilterUtils';

const FILTER_PARAM_NAME = 'filter';
const DEBOUNCE_DELAY = 500;

/**
 * Custom hook to sync Grid filter state with URL query parameters
 * - Reads filter from URL on mount, falls back to default if not present
 * - Debounces URL updates when filter changes (500ms)
 * - Enables shareable URLs with filter state
 *
 * @returns Object containing:
 *   - filter: Current filter state from URL or default
 *   - updateFilterInUrl: Function to update the filter in URL (automatically debounced)
 */
export function useGridFilterSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the filter from URL to prevent unnecessary re-renders
  const filter = useMemo((): GridFilter => {
    const encoded = searchParams.get(FILTER_PARAM_NAME);
    if (encoded) {
      const decoded = decodeFilter(encoded);
      if (decoded) {
        return decoded;
      }
    }
    return getDefaultFilter();
  }, [searchParams]);

  // Debounced function to update filter in URL
  const updateFilterInUrl = useCallback(
    (newFilter: GridFilter) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        const encoded = encodeFilter(newFilter);
        if (encoded) {
          setSearchParams({ [FILTER_PARAM_NAME]: encoded }, { replace: false });
        }
        debounceTimerRef.current = null;
      }, DEBOUNCE_DELAY);
    },
    [setSearchParams]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    filter,
    updateFilterInUrl,
  };
}
