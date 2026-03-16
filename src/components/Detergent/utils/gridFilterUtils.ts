import { CompositeFilterDescriptor, FilterDescriptor } from './filterTypes';

const DEFAULT_FILTER: CompositeFilterDescriptor = {
  logic: 'and',
  filters: [{ field: 'hasLipase', operator: 'eq', value: true }],
};

/**
 * Map of field names to their operators
 * Text fields use 'contains', others use 'eq'
 */
const FIELD_OPERATOR_MAP: Record<string, string> = {
  // Text fields
  brand: 'contains',
  name: 'contains',
  countriesAvailable: 'contains',
  lastUpdatedFormatted: 'eq', // Date field
  // All other fields default to 'eq' (boolean, enum, date)
};

/**
 * Gets the appropriate operator for a given field name
 * @param fieldName - The name of the field to filter on
 * @returns The operator ('eq' or 'contains')
 */
function getOperatorForField(fieldName: string): string {
  return FIELD_OPERATOR_MAP[fieldName] ?? 'eq';
}

/**
 * Encodes a filter object to an array of parameter strings
 * Example: { hasLipase: true, TAED: true, brand: "Tide" } becomes ["hasLipase", "TAED", "brand:Tide"]
 * Boolean true values are just the field name, others use field:value format
 * @param filter - The filter object to encode
 * @returns An array of parameter strings for repeating f params
 */
export function encodeFilter(filter: CompositeFilterDescriptor): string[] {
  try {
    const params: string[] = [];

    filter.filters.forEach((f) => {
      if (isFilterDescriptor(f)) {
        const field = (f as FilterDescriptor).field as string;
        const value = (f as FilterDescriptor).value;

        // For boolean true, just use field name; for others, use field:value
        if (value === true) {
          params.push(field);
        } else {
          params.push(`${field}:${value}`);
        }
      }
    });

    return params;
  } catch (error) {
    console.warn('Error encoding filter:', error);
    return [];
  }
}

/**
 * Decodes an array of parameter strings back to a filter object
 * @param encoded - An array of encoded parameter strings, or null
 * @returns The decoded filter object, or null if decoding fails
 */
export function decodeFilter(encoded: string[] | null): CompositeFilterDescriptor | null {
  try {
    if (!encoded || encoded.length === 0) {
      return null;
    }

    const filters: FilterDescriptor[] = [];

    for (const param of encoded) {
      // Validate param is not empty or just whitespace
      if (!param || param.trim() === '') {
        return null; // Invalid parameter
      }

      const colonIndex = param.indexOf(':');
      let field: string;
      let value: string | boolean | number;

      if (colonIndex === -1) {
        // Just field name (boolean true)
        field = param.trim();
        value = true;
      } else {
        field = param.substring(0, colonIndex).trim();
        const valueStr = param.substring(colonIndex + 1).trim();

        // Validate field name is not empty and value is not empty
        if (!field || !valueStr) {
          return null; // Invalid parameter
        }

        // Try to parse as boolean or number
        if (valueStr === 'true') {
          value = true;
        } else if (valueStr === 'false') {
          value = false;
        } else if (!isNaN(Number(valueStr))) {
          value = Number(valueStr);
        } else {
          value = valueStr;
        }
      }

      // Basic validation that field is not just whitespace
      if (!field) {
        return null;
      }

      filters.push({
        field,
        operator: getOperatorForField(field),
        value,
      });
    }

    return filters.length > 0
      ? {
          logic: 'and',
          filters,
        }
      : null;
  } catch (error) {
    console.warn('Error decoding filter:', error);
    return null;
  }
}

/**
 * Validates that an object is a valid FilterDescriptor
 * @param obj - The object to validate
 * @returns True if valid FilterDescriptor, false otherwise
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
function isFilterDescriptor(obj: any): obj is FilterDescriptor {
  return obj && typeof obj === 'object' && typeof obj.field === 'string' && obj.value !== undefined;
}

/**
 * Gets the default filter
 * @returns The default filter object
 */
export function getDefaultFilter(): CompositeFilterDescriptor {
  return JSON.parse(JSON.stringify(DEFAULT_FILTER));
}

/**
 * Returns true if the given filter is equivalent to the default filter,
 * meaning no URL params should be written for it.
 */
export function isFilterDefault(filter: CompositeFilterDescriptor): boolean {
  return JSON.stringify(encodeFilter(filter).sort()) === JSON.stringify(encodeFilter(DEFAULT_FILTER).sort());
}
