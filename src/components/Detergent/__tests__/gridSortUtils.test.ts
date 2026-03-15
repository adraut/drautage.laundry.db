import { encodeSort, decodeSort, getDefaultSort, isSortDefault } from '../utils/gridSortUtils';
import type { SortModelItem } from '../utils/gridSortUtils';

describe('encodeSort', () => {
  it('encodes a single sort item', () => {
    expect(encodeSort([{ colId: 'brand', sort: 'asc' }])).toEqual(['brand:asc']);
  });

  it('encodes multiple sort items preserving order', () => {
    const model: SortModelItem[] = [
      { colId: 'brand', sort: 'asc' },
      { colId: 'name', sort: 'asc' },
      { colId: 'type', sort: 'desc' },
    ];
    expect(encodeSort(model)).toEqual(['brand:asc', 'name:asc', 'type:desc']);
  });

  it('encodes desc direction', () => {
    expect(encodeSort([{ colId: 'name', sort: 'desc' }])).toEqual(['name:desc']);
  });

  it('returns empty array for empty input', () => {
    expect(encodeSort([])).toEqual([]);
  });
});

describe('decodeSort', () => {
  it('decodes a single sort param', () => {
    expect(decodeSort(['brand:asc'])).toEqual([{ colId: 'brand', sort: 'asc' }]);
  });

  it('decodes multiple sort params preserving order', () => {
    expect(decodeSort(['brand:asc', 'name:asc', 'type:desc'])).toEqual([
      { colId: 'brand', sort: 'asc' },
      { colId: 'name', sort: 'asc' },
      { colId: 'type', sort: 'desc' },
    ]);
  });

  it('returns null for empty array', () => {
    expect(decodeSort([])).toBeNull();
  });

  it('returns null for invalid direction', () => {
    expect(decodeSort(['brand:invalid'])).toBeNull();
  });

  it('returns null when colon is missing', () => {
    expect(decodeSort(['brandasc'])).toBeNull();
  });

  it('returns null for empty colId', () => {
    expect(decodeSort([':asc'])).toBeNull();
  });

  it('returns null for empty param string', () => {
    expect(decodeSort([''])).toBeNull();
  });

  it('returns null for whitespace-only param', () => {
    expect(decodeSort(['   '])).toBeNull();
  });

  it('handles colId with colons (uses lastIndexOf)', () => {
    // Edge case: colId itself contains a colon — uses last colon as separator
    const result = decodeSort(['col:id:asc']);
    expect(result).toEqual([{ colId: 'col:id', sort: 'asc' }]);
  });
});

describe('encodeSort / decodeSort roundtrip', () => {
  it('roundtrips a single ascending sort', () => {
    const model: SortModelItem[] = [{ colId: 'brand', sort: 'asc' }];
    expect(decodeSort(encodeSort(model))).toEqual(model);
  });

  it('roundtrips multi-column sort with mixed directions', () => {
    const model: SortModelItem[] = [
      { colId: 'brand', sort: 'asc' },
      { colId: 'name', sort: 'desc' },
      { colId: 'type', sort: 'asc' },
    ];
    expect(decodeSort(encodeSort(model))).toEqual(model);
  });

  it('preserves sort priority order through roundtrip', () => {
    const model: SortModelItem[] = [
      { colId: 'type', sort: 'asc' },
      { colId: 'brand', sort: 'desc' },
    ];
    const result = decodeSort(encodeSort(model));
    expect(result?.[0].colId).toBe('type');
    expect(result?.[1].colId).toBe('brand');
  });

  it('produces different encoded strings for different sort models', () => {
    const model1: SortModelItem[] = [{ colId: 'brand', sort: 'asc' }];
    const model2: SortModelItem[] = [{ colId: 'name', sort: 'asc' }];
    expect(encodeSort(model1)).not.toEqual(encodeSort(model2));
  });

  it('produces different encoded strings for same column with different directions', () => {
    const asc: SortModelItem[] = [{ colId: 'brand', sort: 'asc' }];
    const desc: SortModelItem[] = [{ colId: 'brand', sort: 'desc' }];
    expect(encodeSort(asc)).not.toEqual(encodeSort(desc));
  });
});

describe('getDefaultSort', () => {
  it('returns brand → name → type ascending', () => {
    expect(getDefaultSort()).toEqual([
      { colId: 'brand', sort: 'asc' },
      { colId: 'name', sort: 'asc' },
      { colId: 'type', sort: 'asc' },
    ]);
  });

  it('returns a new array each call (no shared reference)', () => {
    const a = getDefaultSort();
    const b = getDefaultSort();
    expect(a).not.toBe(b);
    a[0].sort = 'desc';
    expect(b[0].sort).toBe('asc');
  });
});

describe('isSortDefault', () => {
  it('returns true for the exact default sort', () => {
    expect(isSortDefault(getDefaultSort())).toBe(true);
  });

  it('returns true for an independent copy of the default', () => {
    const copy = [
      { colId: 'brand', sort: 'asc' as const },
      { colId: 'name', sort: 'asc' as const },
      { colId: 'type', sort: 'asc' as const },
    ];
    expect(isSortDefault(copy)).toBe(true);
  });

  it('returns false when a column direction differs', () => {
    const model = [
      { colId: 'brand', sort: 'asc' as const },
      { colId: 'name', sort: 'desc' as const },
      { colId: 'type', sort: 'asc' as const },
    ];
    expect(isSortDefault(model)).toBe(false);
  });

  it('returns false when a column is different', () => {
    const model = [
      { colId: 'brand', sort: 'asc' as const },
      { colId: 'name', sort: 'asc' as const },
      { colId: 'hasProtease', sort: 'asc' as const },
    ];
    expect(isSortDefault(model)).toBe(false);
  });

  it('returns false when order differs', () => {
    const model = [
      { colId: 'name', sort: 'asc' as const },
      { colId: 'brand', sort: 'asc' as const },
      { colId: 'type', sort: 'asc' as const },
    ];
    expect(isSortDefault(model)).toBe(false);
  });

  it('returns false when fewer columns', () => {
    expect(isSortDefault([{ colId: 'brand', sort: 'asc' }])).toBe(false);
  });

  it('returns false for empty array', () => {
    expect(isSortDefault([])).toBe(false);
  });
});
