import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const DETERGENT_PARAM = 'd';

export function useDetergentUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const slug = searchParams.get(DETERGENT_PARAM);

  const setDetergentSlug = useCallback(
    (newSlug: string | null) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev.toString());
          if (newSlug) {
            params.set(DETERGENT_PARAM, newSlug);
          } else {
            params.delete(DETERGENT_PARAM);
          }
          return params;
        },
        { replace: false },
      );
    },
    [setSearchParams],
  );

  return { slug, setDetergentSlug };
}
