import LZ from 'lz-string';

export interface GridFilter {
  logic: 'and' | 'or';
  filters: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
}

const DEFAULT_FILTER: GridFilter = {
  logic: 'and',
  filters: [{ field: 'hasLipase', operator: 'contains', value: true }],
};

/**
 * Encodes a filter object to a compressed, URL-encoded string
 * @param filter - The filter object to encode
 * @returns A compressed, URL-safe string suitable for query parameters
 */
export function encodeFilter(filter: GridFilter): string {
  try {
    const json = JSON.stringify(filter);
    const compressed = LZ.compressToEncodedURIComponent(json);
    return compressed;
  } catch (error) {
    console.warn('Error encoding filter:', error);
    return '';
  }
}

/**
 * Decodes a compressed, URL-encoded string back to a filter object
 * @param encoded - The encoded string from URL parameters
 * @returns The decoded filter object, or null if decoding fails
 */
export function decodeFilter(encoded: string): GridFilter | null {
  try {
    if (!encoded) {
      return null;
    }
    const decompressed = LZ.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) {
      console.warn('Failed to decompress filter string');
      return null;
    }
    const parsed = JSON.parse(decompressed);
    return validateFilter(parsed) ? parsed : null;
  } catch (error) {
    console.warn('Error decoding filter:', error);
    return null;
  }
}

/**
 * Validates that an object has the expected filter structure
 * @param obj - The object to validate
 * @returns True if valid filter structure, false otherwise
 */
function validateFilter(obj: any): obj is GridFilter {
  return (
    obj &&
    typeof obj === 'object' &&
    (obj.logic === 'and' || obj.logic === 'or') &&
    Array.isArray(obj.filters) &&
    obj.filters.every(
      (f: any) =>
        f &&
        typeof f === 'object' &&
        typeof f.field === 'string' &&
        typeof f.operator === 'string'
    )
  );
}

/**
 * Gets the default filter
 * @returns The default filter object
 */
export function getDefaultFilter(): GridFilter {
  return JSON.parse(JSON.stringify(DEFAULT_FILTER));
}
