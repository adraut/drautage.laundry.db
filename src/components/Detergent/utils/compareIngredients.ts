import { Ingredient } from '../../common/types/Ingredient';
import { DetergentProfile } from '../types/DetergentProfile';
import { getIngredientCategories } from '../../common/types/IngredientCategoryMap';

export interface CompareIngredientEntry {
  ingredient: Ingredient;
  functions: string[];
}

export interface CompareGroup {
  display: string;
  ingredients: CompareIngredientEntry[];
}

export interface CompareMatrix {
  groups: CompareGroup[];
  /** Maps ingredient → set of profile slugs that contain it */
  presence: Map<Ingredient, Set<string>>;
}

const CATEGORY_GROUPS: { display: string; categories: string[] }[] = [
  { display: 'Surfactants', categories: ['Anionic Surfactant', 'Nonionic Surfactant', 'Amphoteric Surfactant'] },
  { display: 'Soaps', categories: ['Soap'] },
  { display: 'Enzymes', categories: ['Enzyme'] },
  { display: 'Oxygen Bleach', categories: ['Oxygen Bleach', 'Oxygen Bleach Booster'] },
  { display: 'Builders', categories: ['Builder'] },
  {
    display: 'Chelators / Softeners / Conditioners',
    categories: ['Water Conditioner', 'Enzyme Stabilizer', 'Fabric Conditioner', 'Fabric Antioxidant'],
  },
  { display: 'Fragrance', categories: ['Scent'] },
  { display: 'Optical Brighteners', categories: ['Optical Brightener'] },
  { display: 'Dye Transfer Inhibitors', categories: ['Dye Transfer Inhibitor'] },
  { display: 'Anti-Redeposition', categories: ['Soil Anti-Redeposition', 'Soil Release'] },
  { display: 'Dyes', categories: ['Dye'] },
  { display: 'Preservatives', categories: ['Preservative'] },
  {
    display: 'Misc',
    categories: [
      'Odor Eliminator',
      'Suds Reducer',
      'Bittering Agent',
      'Pac Film',
      'Filler',
      'Solvent',
      'Thickener',
      'Processing Aid',
    ],
  },
];

export function buildCompareMatrix(profiles: DetergentProfile[]): CompareMatrix {
  const presence = new Map<Ingredient, Set<string>>();

  for (const profile of profiles) {
    const slug = profile.slug;
    for (const ingredient of profile.ingredients) {
      if (!presence.has(ingredient)) presence.set(ingredient, new Set());
      presence.get(ingredient)!.add(slug);
    }
  }

  // Union of context-rule additions across all profiles, keyed by ingredient.
  const additionsMap = new Map<Ingredient, Set<string>>();
  for (const profile of profiles) {
    for (const ingredient of profile.ingredients) {
      const added = profile.effectiveCategoryAdditions.get(ingredient);
      if (added) {
        const existing = additionsMap.get(ingredient);
        if (existing) {
          for (const cat of added) existing.add(cat);
        } else {
          additionsMap.set(ingredient, new Set(added));
        }
      }
    }
  }

  // category label → ingredients in that category (that appear in at least one selected profile)
  const categoryToIngredients = new Map<string, Set<Ingredient>>();
  for (const ingredient of presence.keys()) {
    const cats = [...getIngredientCategories(ingredient), ...(additionsMap.get(ingredient) ?? [])];
    for (const cat of new Set(cats)) {
      if (!categoryToIngredients.has(cat)) categoryToIngredients.set(cat, new Set());
      categoryToIngredients.get(cat)!.add(ingredient);
    }
  }

  const assignedIngredients = new Set<Ingredient>();
  const groups: CompareGroup[] = [];

  for (const group of CATEGORY_GROUPS) {
    const seen = new Set<Ingredient>();
    const ingredientsInGroup: Ingredient[] = [];

    for (const cat of group.categories) {
      for (const ingredient of categoryToIngredients.get(cat) ?? []) {
        if (!seen.has(ingredient)) {
          seen.add(ingredient);
          ingredientsInGroup.push(ingredient);
        }
      }
    }

    if (ingredientsInGroup.length === 0) continue;

    ingredientsInGroup.sort((a, b) => a.localeCompare(b));

    groups.push({
      display: group.display,
      ingredients: ingredientsInGroup.map((ingredient) => ({
        ingredient,
        functions: [...new Set([...getIngredientCategories(ingredient), ...(additionsMap.get(ingredient) ?? [])])],
      })),
    });

    for (const ingredient of ingredientsInGroup) assignedIngredients.add(ingredient);
  }

  // Uncategorized ingredients fold into Misc
  const uncategorized: Ingredient[] = [];
  for (const ingredient of presence.keys()) {
    if (!assignedIngredients.has(ingredient)) uncategorized.push(ingredient);
  }
  uncategorized.sort((a, b) => a.localeCompare(b));

  if (uncategorized.length > 0) {
    const miscEntries: CompareIngredientEntry[] = uncategorized.map((ingredient) => ({ ingredient, functions: [] }));
    const miscGroup = groups.find((g) => g.display === 'Misc');
    if (miscGroup) {
      miscGroup.ingredients.push(...miscEntries);
    } else {
      groups.push({ display: 'Misc', ingredients: miscEntries });
    }
  }

  return { groups, presence };
}
