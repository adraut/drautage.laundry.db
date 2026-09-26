import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompositeFilterDescriptor } from '../utils/filterTypes';
import { encodeFilter, decodeFilter, createEmptyFilter } from '../utils/gridFilterUtils';

const FILTER_PARAM_NAME = 'f';
const DEBOUNCE_DELAY = 500;

/**
 * Applies a filter to a URLSearchParams instance, replacing any existing f params.
 * An empty (or unencodable) filter results in no f params, i.e. "no filter".
 */
function applyFilterParams(prev: URLSearchParams, filter: CompositeFilterDescriptor): URLSearchParams {
  const params = new URLSearchParams(prev.toString());
  params.delete(FILTER_PARAM_NAME);
  encodeFilter(filter).forEach((param) => params.append(FILTER_PARAM_NAME, param));
  return params;
}

/**
 * Custom hook to sync Grid filter state with URL query parameters
 * - Reads filter from URL on mount; no params (or an undecodable param) means no filter
 * - Debounces URL updates when filter changes (500ms)
 * - Enables shareable URLs with filter state
 * - Uses repeating f parameters: ?f=hasLipase&f=brand:Tide
 *
 * @returns Object containing:
 *   - filter: Current filter state from URL, or empty if no params are present
 *   - updateFilterInUrl: Function to update the filter in URL (automatically debounced)
 */
export function useGridFilterSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stable key derived only from filter params. When sort (or other) params change
  // without touching filter params, this string stays the same, so the filter memo
  // below does not produce a new object and the Detergents useEffect does not fire.
  const filterParamsKey = useMemo(() => searchParams.getAll(FILTER_PARAM_NAME).join('\0'), [searchParams]);

  const filter = useMemo((): CompositeFilterDescriptor => {
    const filterParams = filterParamsKey ? filterParamsKey.split('\0') : [];
    if (filterParams.length > 0) {
      const decoded = decodeFilter(filterParams);
      if (decoded) {
        return decoded;
      }
    }
    return createEmptyFilter();
  }, [filterParamsKey]);

  // Debounced function to update filter in URL
  const updateFilterInUrl = useCallback(
    (newFilter: CompositeFilterDescriptor) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        setSearchParams((prev) => applyFilterParams(prev, newFilter), { replace: false });
        debounceTimerRef.current = null;
      }, DEBOUNCE_DELAY);
    },
    [setSearchParams],
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Non-debounced variant for reset actions — cancels any pending debounce and updates immediately
  const resetFilterInUrl = useCallback(
    (newFilter: CompositeFilterDescriptor) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      setSearchParams((prev) => applyFilterParams(prev, newFilter), { replace: false });
    },
    [setSearchParams],
  );

  return {
    filter,
    updateFilterInUrl,
    resetFilterInUrl,
  };
}
