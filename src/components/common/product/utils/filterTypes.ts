export interface FilterDescriptor {
  field: string;
  operator: string;
  value: string | boolean | number;
}

export interface CompositeFilterDescriptor {
  logic: 'and' | 'or';
  filters: FilterDescriptor[];
}

/**
 * Applies a CompositeFilterDescriptor to an array of items.
 * Supports operators: 'eq' (strict equality) and 'contains' (case-insensitive substring).
 */
export function filterBy<T>(data: T[], filter: CompositeFilterDescriptor): T[] {
  return data.filter((item) => {
    const record = item as Record<string, unknown>;
    const results = filter.filters.map((f) => {
      const value = record[f.field];
      if (f.operator === 'eq') {
        return value === f.value;
      }
      if (f.operator === 'contains') {
        return String(value ?? '')
          .toLowerCase()
          .includes(String(f.value).toLowerCase());
      }
      return true;
    });
    return filter.logic === 'and' ? results.every(Boolean) : results.some(Boolean);
  });
}
