import type { SortModelItem } from 'ag-grid-community';

export type { SortModelItem };

const DEFAULT_SORT: SortModelItem[] = [
  { colId: 'brand', sort: 'asc' },
  { colId: 'name', sort: 'asc' },
  { colId: 'type', sort: 'asc' },
];

const VALID_SORTS = new Set<string>(['asc', 'desc']);

/**
 * Encodes a sort model to an array of URL parameter strings.
 * Order in the array determines sort priority.
 * Example: [{ colId: 'brand', sort: 'asc' }, { colId: 'name', sort: 'desc' }]
 *          → ['brand:asc', 'name:desc']
 */
export function encodeSort(sortModel: SortModelItem[]): string[] {
  return sortModel.map((item) => `${item.colId}:${item.sort}`);
}

/**
 * Decodes an array of URL parameter strings back to a sort model.
 * Returns null if any parameter is invalid.
 * Example: ['brand:asc', 'name:desc'] → [{ colId: 'brand', sort: 'asc' }, ...]
 */
export function decodeSort(encoded: string[]): SortModelItem[] | null {
  try {
    if (!encoded || encoded.length === 0) return null;

    const result: SortModelItem[] = [];

    for (const param of encoded) {
      if (!param || param.trim() === '') return null;

      const colonIdx = param.lastIndexOf(':');
      if (colonIdx === -1) return null;

      const colId = param.substring(0, colonIdx).trim();
      const sort = param.substring(colonIdx + 1).trim();

      if (!colId || !VALID_SORTS.has(sort)) return null;

      result.push({ colId, sort: sort as 'asc' | 'desc' });
    }

    return result.length > 0 ? result : null;
  } catch {
    return null;
  }
}

/**
 * Returns the default sort model (Brand → Product Name → Type, all ascending).
 */
export function getDefaultSort(): SortModelItem[] {
  return DEFAULT_SORT.map((item) => ({ ...item }));
}

/**
 * Returns true if the given sort model is equal to the default sort.
 * Used to avoid writing default sort state into the URL.
 */
export function isSortDefault(sortModel: SortModelItem[]): boolean {
  if (sortModel.length !== DEFAULT_SORT.length) return false;
  return sortModel.every((item, i) => item.colId === DEFAULT_SORT[i].colId && item.sort === DEFAULT_SORT[i].sort);
}
