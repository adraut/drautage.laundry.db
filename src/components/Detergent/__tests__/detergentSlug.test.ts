import * as profiles from '../data/profiles';

describe('detergent slugs', () => {
  it('are unique across all profiles', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const [exportName, profile] of Object.entries(profiles)) {
      const { slug } = profile;
      if (seen.has(slug)) {
        duplicates.push(`"${slug}" on ${exportName} (already used by ${seen.get(slug)})`);
      } else {
        seen.set(slug, exportName);
      }
    }
    expect(duplicates).toEqual([]);
  });
});
