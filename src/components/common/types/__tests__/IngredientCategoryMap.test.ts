import { getIngredientCategories } from '../IngredientCategoryMap';
import { Ingredient } from '../Ingredient';
import { AmphotericSurfactants } from '../AmphotericSurfactants';
import { AnionicSurfactants } from '../AnionicSurfactants';
import { BitteringAgents } from '../BitteringAgents';
import { Builders } from '../Builders';
import { FabricAntioxidants } from '../FabricAntioxidants';
import { FabricConditioners } from '../FabricConditioners';
import { Fillers } from '../Fillers';
import { NonionicSurfactants } from '../NonionicSurfactants';
import { Soaps } from '../Soaps';
import { Enzymes } from '../Enzymes';
import { EnzymeStabilizers } from '../EnzymeStabilizers';
import { OpticalBrighteners } from '../OpticalBrighteners';
import { OxygenBleaches } from '../OxygenBleaches';
import { OxygenBleachBoosters } from '../OxygenBleachBoosters';
import { DyeTransferInhibitors } from '../DyeTransferInhibitors';
import { Colorants } from '../Colorants';
import { Scents } from '../Scents';
import { SudsReducers } from '../SudsReducers';
import { WaterConditioners } from '../WaterConditioners';
import { Preservatives } from '../Preservatives';
import { OdorEliminators } from '../OdorEliminators';
import { SoilAntiRedeposition } from '../SoilAntiRedeposition';
import { SoilRelease } from '../SoilRelease';
import { Sulfates } from '../Sulfates';
import { PacFilm } from '../PacFilm';
import { ProcessingAids } from '../ProcessingAids';
import { Solvents } from '../Solvents';
import { Thickeners } from '../Thickeners';

describe('getIngredientCategories', () => {
  it('returns correct label for a single-category ingredient', () => {
    expect(getIngredientCategories(Ingredient.SodiumC10_16Alkylbenzenesulfonate)).toEqual(['Anionic Surfactant']);
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
  [AmphotericSurfactants, 'Amphoteric Surfactant'],
  [AnionicSurfactants, 'Anionic Surfactant'],
  [BitteringAgents, 'Bittering Agent'],
  [Builders, 'Builder'],
  [FabricAntioxidants, 'Fabric Antioxidant'],
  [FabricConditioners, 'Fabric Conditioner'],
  [Fillers, 'Filler'],
  [NonionicSurfactants, 'Nonionic Surfactant'],
  [Soaps, 'Soap'],
  [Enzymes, 'Enzyme'],
  [EnzymeStabilizers, 'Enzyme Stabilizer'],
  [OpticalBrighteners, 'Optical Brightener'],
  [OxygenBleaches, 'Oxygen Bleach'],
  [OxygenBleachBoosters, 'Oxygen Bleach Booster'],
  [DyeTransferInhibitors, 'Dye Transfer Inhibitor'],
  [Colorants, 'Product Colorant'],
  [Scents, 'Scent'],
  [SudsReducers, 'Suds Reducer'],
  [WaterConditioners, 'Water Conditioner'],
  [Preservatives, 'Preservative'],
  [OdorEliminators, 'Odor Eliminator'],
  [SoilAntiRedeposition, 'Soil Anti-Redeposition'],
  [SoilRelease, 'Soil Release'],
  [Sulfates, 'Sulfate'],
  [PacFilm, 'Pac Film'],
  [ProcessingAids, 'Processing Aid'],
  [Solvents, 'Solvent'],
  [Thickeners, 'Thickener'],
];

describe('registry completeness', () => {
  it.each(displayCategories)('every ingredient in %s is mapped with label "%s"', (set, label) => {
    for (const ingredient of set) {
      expect(getIngredientCategories(ingredient)).toContain(label);
    }
  });
});
