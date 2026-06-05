import { buildCompareMatrix } from '../utils/compareIngredients';
import { DetergentProfile } from '../types/DetergentProfile';
import { DetergentType } from '../types/DetergentType';
import { DataSource } from '../types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

function makeProfile(name: string, brand: string, ingredients: Ingredient[]): DetergentProfile {
  return new DetergentProfile(name, brand, DetergentType.Liquid, DataSource.Package, ingredients, new Date());
}

describe('buildCompareMatrix', () => {
  it('returns empty groups and presence for zero profiles', () => {
    const result = buildCompareMatrix([]);
    expect(result.groups).toHaveLength(0);
    expect(result.presence.size).toBe(0);
  });

  it('places an enzyme in the Enzymes group', () => {
    const profile = makeProfile('Test', 'Brand', [Ingredient.Amylase]);
    const { groups } = buildCompareMatrix([profile]);
    const enzymes = groups.find((g) => g.display === 'Enzymes');
    expect(enzymes).toBeDefined();
    expect(enzymes!.ingredients.map((e) => e.ingredient)).toContain(Ingredient.Amylase);
  });

  it('places an anionic surfactant in the Surfactants group', () => {
    const profile = makeProfile('Test', 'Brand', [Ingredient.SodiumLaurylSulfate]);
    const { groups } = buildCompareMatrix([profile]);
    const surfactants = groups.find((g) => g.display === 'Surfactants');
    expect(surfactants).toBeDefined();
    expect(surfactants!.ingredients.map((e) => e.ingredient)).toContain(Ingredient.SodiumLaurylSulfate);
  });

  it('sorts ingredients alphabetically within a group', () => {
    const profile = makeProfile('Test', 'Brand', [Ingredient.Protease, Ingredient.Amylase, Ingredient.Cellulase]);
    const { groups } = buildCompareMatrix([profile]);
    const enzymes = groups.find((g) => g.display === 'Enzymes');
    expect(enzymes).toBeDefined();
    const names = enzymes!.ingredients.map((e) => e.ingredient);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('records presence correctly for each profile', () => {
    const p1 = makeProfile('Alpha', 'Brand', [Ingredient.Amylase]);
    const p2 = makeProfile('Beta', 'Brand', [Ingredient.Amylase, Ingredient.Protease]);
    const { presence } = buildCompareMatrix([p1, p2]);

    const amylaseSlugs = presence.get(Ingredient.Amylase);
    expect(amylaseSlugs).toBeDefined();
    expect(amylaseSlugs!.size).toBe(2);

    const proteaseSlugs = presence.get(Ingredient.Protease);
    expect(proteaseSlugs).toBeDefined();
    expect(proteaseSlugs!.size).toBe(1);
  });

  it('only includes ingredients present in at least one profile', () => {
    const profile = makeProfile('Test', 'Brand', [Ingredient.Amylase]);
    const { presence } = buildCompareMatrix([profile]);
    expect(presence.has(Ingredient.Cellulase)).toBe(false);
  });

  it('omits groups where no selected profile has any ingredient', () => {
    const profile = makeProfile('Test', 'Brand', [Ingredient.Amylase]);
    const { groups } = buildCompareMatrix([profile]);
    const dyes = groups.find((g) => g.display === 'Dyes');
    expect(dyes).toBeUndefined();
  });

  it('includes functions (category labels) on each ingredient entry', () => {
    const profile = makeProfile('Test', 'Brand', [Ingredient.Amylase]);
    const { groups } = buildCompareMatrix([profile]);
    const enzymes = groups.find((g) => g.display === 'Enzymes');
    const entry = enzymes!.ingredients.find((e) => e.ingredient === Ingredient.Amylase);
    expect(entry!.functions.length).toBeGreaterThan(0);
    expect(entry!.functions).toContain('Enzyme');
  });
});
