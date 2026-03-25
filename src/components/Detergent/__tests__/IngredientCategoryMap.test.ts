import { getIngredientCategories } from '../../common/types/IngredientCategoryMap';
import { Ingredient } from '../../common/types/Ingredient';
import { AnionicSurfactants } from '../../common/types/AnionicSurfactants';
import { NonionicSurfactants } from '../../common/types/NonionicSurfactants';
import { Soaps } from '../../common/types/Soaps';
import { Enzymes } from '../../common/types/Enzymes';
import { OpticalBrighteners } from '../../common/types/OpticalBrighteners';
import { OxygenBleaches } from '../../common/types/OxygenBleaches';
import { DyeTransferInhibitors } from '../../common/types/DyeTransferInhibitors';
import { Dyes } from '../../common/types/Dyes';
import { Scents } from '../../common/types/Scents';
import { SudsReducers } from '../../common/types/SudsReducers';
import { WaterConditioners } from '../../common/types/WaterConditioners';
import { Preservatives } from '../../common/types/Preservatives';
import { OdorEliminators } from '../../common/types/OdorEliminators';
import { SoilAntiRedeposition } from '../../common/types/SoilAntiRedeposition';
import { SoilRelease } from '../../common/types/SoilRelease';

describe('getIngredientCategories', () => {
  it('returns correct label for a single-category ingredient', () => {
    expect(getIngredientCategories(Ingredient.SodiumLaurylSulfate)).toEqual(['Anionic Surfactant']);
  });

  it('returns both labels for an ingredient in multiple categories', () => {
    // C8_18FattyAcidsSodiumSalt appears in both Soaps and SudsReducers
    expect(getIngredientCategories(Ingredient.C8_18FattyAcidsSodiumSalt)).toEqual(['Soap', 'Suds Reducer']);
  });

  it('returns "Enzyme" for an enzyme ingredient in a subtype set', () => {
    expect(getIngredientCategories(Ingredient.Protease)).toEqual(['Enzyme']);
    expect(getIngredientCategories(Ingredient.Amylase)).toEqual(['Enzyme']);
  });

  it('returns "Enzyme" for an enzyme ingredient not in any subtype set', () => {
    expect(getIngredientCategories(Ingredient.DNase)).toEqual(['Enzyme']);
  });

  it('returns empty array for an uncategorized ingredient', () => {
    expect(getIngredientCategories(Ingredient.Water)).toEqual([]);
  });
});

// Registry completeness: every display-category set must be registered in IngredientCategoryMap.
// When adding a new display category set, add it here AND to CATEGORY_SETS in IngredientCategoryMap.ts.
// Intentionally excluded: NonBiodegradable, SepticUnfriendly (safety flags, not functional roles);
//   Amylases, Cellulases, Proteases, Pectinases (enzyme subtypes collapsed into "Enzyme").
const displayCategories: [Set<Ingredient>, string][] = [
  [AnionicSurfactants, 'Anionic Surfactant'],
  [NonionicSurfactants, 'Nonionic Surfactant'],
  [Soaps, 'Soap'],
  [Enzymes, 'Enzyme'],
  [OpticalBrighteners, 'Optical Brightener'],
  [OxygenBleaches, 'Oxygen Bleach'],
  [DyeTransferInhibitors, 'Dye Transfer Inhibitor'],
  [Dyes, 'Dye'],
  [Scents, 'Scent'],
  [SudsReducers, 'Suds Reducer'],
  [WaterConditioners, 'Water Conditioner'],
  [Preservatives, 'Preservative'],
  [OdorEliminators, 'Odor Eliminator'],
  [SoilAntiRedeposition, 'Soil Anti-Redeposition'],
  [SoilRelease, 'Soil Release'],
];

describe('registry completeness', () => {
  it.each(displayCategories)('every ingredient in %s is mapped with label "%s"', (set, label) => {
    for (const ingredient of set) {
      expect(getIngredientCategories(ingredient)).toContain(label);
    }
  });
});
