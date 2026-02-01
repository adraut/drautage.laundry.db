import LZ from 'lz-string';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';

const DEFAULT_FILTER: CompositeFilterDescriptor = {
  logic: 'and',
  filters: [{ field: 'hasLipase', operator: 'contains', value: true }],
};

/**
 * Encodes a filter object to a compressed, base64-encoded URL-safe string
 * @param filter - The filter object to encode
 * @returns A compressed, base64-encoded string suitable for URL parameters
 */
export function encodeFilter(filter: CompositeFilterDescriptor): string {
  try {
    const json = JSON.stringify(filter);
    const compressed = LZ.compressToBase64(json);
    return compressed;
  } catch (error) {
    console.warn('Error encoding filter:', error);
    return '';
  }
}

/**
 * Decodes a compressed, base64-encoded string back to a filter object
 * @param encoded - The encoded string from URL parameters
 * @returns The decoded filter object, or null if decoding fails
 */
export function decodeFilter(encoded: string): CompositeFilterDescriptor | null {
  try {
    if (!encoded) {
      return null;
    }
    const decompressed = LZ.decompressFromBase64(encoded);
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
/* eslint-disable @typescript-eslint/no-explicit-any */
function validateFilter(obj: any): obj is CompositeFilterDescriptor {
  return isCompositeFilterDescriptor(obj);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isCompositeFilterDescriptor(obj: any): obj is CompositeFilterDescriptor {
  return (
    obj &&
    typeof obj === 'object' &&
    (obj.logic === 'and' || obj.logic === 'or') &&
    Array.isArray(obj.filters) &&
    obj.filters.every((f: any) => isFilterDescriptor(f) || isCompositeFilterDescriptor(f))
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isFilterDescriptor(obj: any): obj is FilterDescriptor {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.field === 'string' &&
    typeof obj.operator === 'string'
  );
}

/**
 * Gets the default filter
 * @returns The default filter object
 */
export function getDefaultFilter(): CompositeFilterDescriptor {
  return JSON.parse(JSON.stringify(DEFAULT_FILTER));
}
