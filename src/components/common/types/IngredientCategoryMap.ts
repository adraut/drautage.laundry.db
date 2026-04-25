import { Ingredient } from './Ingredient';
import { AmphotericSurfactants } from './AmphotericSurfactants';
import { AnionicSurfactants } from './AnionicSurfactants';
import { BitteringAgents } from './BitteringAgents';
import { Builders } from './Builders';
import { FabricAntioxidants } from './FabricAntioxidants';
import { FabricConditioners } from './FabricConditioners';
import { Fillers } from './Fillers';
import { NonionicSurfactants } from './NonionicSurfactants';
import { Soaps } from './Soaps';
import { Enzymes } from './Enzymes';
import { EnzymeStabilizers } from './EnzymeStabilizers';
import { OpticalBrighteners } from './OpticalBrighteners';
import { OxygenBleaches } from './OxygenBleaches';
import { OxygenBleachBoosters } from './OxygenBleachBoosters';
import { DyeTransferInhibitors } from './DyeTransferInhibitors';
import { Dyes } from './Dyes';
import { Scents } from './Scents';
import { SudsReducers } from './SudsReducers';
import { WaterConditioners } from './WaterConditioners';
import { Preservatives } from './Preservatives';
import { OdorEliminators } from './OdorEliminators';
import { SoilAntiRedeposition } from './SoilAntiRedeposition';
import { SoilRelease } from './SoilRelease';
import { PacFilm } from './PacFilm';
import { Solvents } from './Solvents';
import { Thickeners } from './Thickeners';
import { ProcessingAids } from './ProcessingAids';

const CATEGORY_SETS: [Set<Ingredient>, string][] = [
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
  [Dyes, 'Dye'],
  [Scents, 'Scent'],
  [SudsReducers, 'Suds Reducer'],
  [WaterConditioners, 'Water Conditioner'],
  [Preservatives, 'Preservative'],
  [OdorEliminators, 'Odor Eliminator'],
  [SoilAntiRedeposition, 'Soil Anti-Redeposition'],
  [SoilRelease, 'Soil Release'],
  [PacFilm, 'Pac Film'],
  [ProcessingAids, 'Processing Aid'],
  [Solvents, 'Solvent'],
  [Thickeners, 'Thickener'],
];

const ingredientCategoryMap = new Map<Ingredient, string[]>();

for (const [set, label] of CATEGORY_SETS) {
  for (const ingredient of set) {
    const existing = ingredientCategoryMap.get(ingredient);
    if (existing) {
      existing.push(label);
    } else {
      ingredientCategoryMap.set(ingredient, [label]);
    }
  }
}

export function getIngredientCategories(ingredient: Ingredient): string[] {
  return ingredientCategoryMap.get(ingredient) ?? [];
}
