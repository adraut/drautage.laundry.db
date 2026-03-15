import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SortModelItem } from '../utils/gridSortUtils';
import { encodeSort, decodeSort, getDefaultSort, isSortDefault } from '../utils/gridSortUtils';

const SORT_PARAM_NAME = 's';
const DEBOUNCE_DELAY = 500;

/**
 * Custom hook to sync AG Grid sort state with URL query parameters.
 * - Reads sort model from URL on mount, falls back to default if not present
 * - Debounces URL updates when sort changes (500ms)
 * - Preserves other URL params (e.g. filter params) when updating sort
 * - Uses repeating s parameters: ?s=brand:asc&s=name:asc&s=type:asc
 *   (order in the URL determines sort priority)
 *
 * @returns Object containing:
 *   - sortModel: Current sort state from URL or default
 *   - updateSortInUrl: Function to update the sort in URL (automatically debounced)
 */
export function useGridSortSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sortModel = useMemo((): SortModelItem[] => {
    const sortParams = searchParams.getAll(SORT_PARAM_NAME);
    if (sortParams.length > 0) {
      const decoded = decodeSort(sortParams);
      if (decoded) return decoded;
    }
    return getDefaultSort();
  }, [searchParams]);

  const updateSortInUrl = useCallback(
    (newSort: SortModelItem[]) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setSearchParams(
          (prev) => {
            const params = new URLSearchParams(prev.toString());
            params.delete(SORT_PARAM_NAME);
            if (!isSortDefault(newSort)) {
              encodeSort(newSort).forEach((p) => params.append(SORT_PARAM_NAME, p));
            }
            return params;
          },
          { replace: false },
        );
        debounceTimerRef.current = null;
      }, DEBOUNCE_DELAY);
    },
    [setSearchParams],
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return { sortModel, updateSortInUrl };
}
