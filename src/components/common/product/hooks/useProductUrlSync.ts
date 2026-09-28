import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const PRODUCT_PARAM = 'd';

export function useProductUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const slug = searchParams.get(PRODUCT_PARAM);

  const setProductSlug = useCallback(
    (newSlug: string | null) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev.toString());
          if (newSlug) {
            params.set(PRODUCT_PARAM, newSlug);
          } else {
            params.delete(PRODUCT_PARAM);
          }
          return params;
        },
        { replace: false },
      );
    },
    [setSearchParams],
  );

  return { slug, setProductSlug };
}
