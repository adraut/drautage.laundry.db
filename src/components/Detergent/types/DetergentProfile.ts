import { Alpha3Code } from 'i18n-iso-countries';
import { DetergentType } from './DetergentType';
import { Ingredient } from '../../common/types/Ingredient';
import { Soaps } from '../../common/types/Soaps';
import { SepticUnfriendly } from '../../common/types/SepticUnfriendly';
import { Scents } from '../../common/types/Scents';
import { OpticalBrighteners } from '../../common/types/OpticalBrighteners';
import { Enzymes, Proteases, Pectinases, Amylases, Cellulases } from '../../common/types/Enzymes';
import { EnzymeStabilizers } from '../../common/types/EnzymeStabilizers';
import { Dyes } from '../../common/types/Dyes';
import { NonBiodegradable } from '../../common/types/NonBiodegradable';
import { AmphotericSurfactants } from '../../common/types/AmphotericSurfactants';
import { Builders } from '../../common/types/Builders';
import { FabricAntioxidants } from '../../common/types/FabricAntioxidants';
import { FabricConditioners } from '../../common/types/FabricConditioners';
import { Fillers } from '../../common/types/Fillers';
import { NonionicSurfactants } from '../../common/types/NonionicSurfactants';
import { AnionicSurfactants } from '../../common/types/AnionicSurfactants';
import { OxygenBleaches } from '../../common/types/OxygenBleaches';
import { OxygenBleachBoosters } from '../../common/types/OxygenBleachBoosters';
import { DyeTransferInhibitors } from '../../common/types/DyeTransferInhibitors';
import { SoilAntiRedeposition } from '../../common/types/SoilAntiRedeposition';
import { SoilRelease } from '../../common/types/SoilRelease';
import { Sulfates } from '../../common/types/Sulfates';
import { ProcessingAids } from '../../common/types/ProcessingAids';
import { IngredientContextRules } from '../../common/types/IngredientContextRules';
import { DataSource } from './DataSource';

export interface DetergentProfileOptions {
  /**
   * Per-ingredient category exclusions that override the global category sets
   * for this specific product. Use when an ingredient's functional role in this
   * formulation differs from its default classification.
   *
   * Profile-level exclusions are merged on top of any matching context rules,
   * with profile-level taking precedence.
   */
  categoryExclusions?: Partial<Record<Ingredient, string[]>>;
}

/**
 * Returns true if at least one ingredient in the list belongs to the given
 * category set AND is not excluded from that category's label by the effective
 * exclusions map.
 */
function hasCategory(
  ingredients: Ingredient[],
  categorySet: Set<Ingredient>,
  label: string,
  exclusions: Partial<Record<Ingredient, string[]>>,
): boolean {
  return ingredients.some((ing) => categorySet.has(ing) && !exclusions[ing]?.includes(label));
}

export class DetergentProfile {
  name: string;
  brand: string;
  type: DetergentType;
  dataSource: DataSource;
  lastUpdated: Date;
  ingredients: Ingredient[];
  countryOfOrigin?: Alpha3Code;
  countriesAvailable?: Alpha3Code[];

  readonly lastUpdatedFormatted: string;
  /**
   * Merged category exclusions for this product, combining context rules
   * (auto-inferred from the ingredient list) and any profile-level overrides.
   * Used by the display layer to filter categories per ingredient.
   */
  readonly effectiveCategoryExclusions: Partial<Record<Ingredient, string[]>>;
  readonly hasAmylase: boolean;
  readonly hasCellulase: boolean;
  readonly hasDNase: boolean;
  readonly hasLipase: boolean;
  readonly hasMannanase: boolean;
  readonly hasPectinase: boolean;
  readonly hasProtease: boolean;
  readonly hasOpticalBrighteners: boolean;
  readonly hasOxygenBleach: boolean;
  readonly hasOxygenBleachBoosters: boolean;
  readonly hasEnzymes: boolean;
  readonly hasEnzymeStabilizers: boolean;
  readonly hasAmphotericSurfactants: boolean;
  readonly hasBuilders: boolean;
  readonly hasFabricAntioxidants: boolean;
  readonly hasFabricConditioners: boolean;
  readonly hasFillers: boolean;
  readonly hasAnionicSurfactants: boolean;
  readonly hasNonionicSurfactants: boolean;
  readonly hasSulfates: boolean;
  readonly hasDyes: boolean;
  readonly hasScents: boolean;
  readonly hasSoaps: boolean;
  readonly hasProcessingAids: boolean;
  readonly hasDyeTransferInhibitors: boolean;
  readonly hasSoilAntiRedepositionAgents: boolean;
  readonly hasSoilReleaseAgents: boolean;
  readonly isBiodegradable: boolean;
  readonly isSepticSafe: boolean;

  constructor(
    name: string,
    brand: string,
    type: DetergentType,
    dataSource: DataSource,
    ingredients: Ingredient[],
    lastUpdated: Date,
    options?: DetergentProfileOptions,
  ) {
    this.name = name;
    this.brand = brand;
    this.type = type;
    this.dataSource = dataSource;
    this.ingredients = ingredients;
    this.lastUpdated = lastUpdated;
    this.lastUpdatedFormatted = this.lastUpdated.toISOString().split('T')[0];

    // Build effective exclusions: context rules first, profile-level on top.
    const exclusions: Partial<Record<Ingredient, string[]>> = {};

    for (const rule of IngredientContextRules) {
      if (ingredients.includes(rule.ingredient) && rule.condition(ingredients, type)) {
        const existing = exclusions[rule.ingredient];
        if (existing) {
          for (const cat of rule.excludeFromCategories) {
            if (!existing.includes(cat)) existing.push(cat);
          }
        } else {
          exclusions[rule.ingredient] = [...rule.excludeFromCategories];
        }
      }
    }

    if (options?.categoryExclusions) {
      for (const key of Object.keys(options.categoryExclusions) as Ingredient[]) {
        const extra = options.categoryExclusions[key]!;
        const existing = exclusions[key];
        if (existing) {
          for (const cat of extra) {
            if (!existing.includes(cat)) existing.push(cat);
          }
        } else {
          exclusions[key] = [...extra];
        }
      }
    }

    this.effectiveCategoryExclusions = exclusions;

    // Compute all derived properties once during construction.
    this.hasAmylase = hasCategory(ingredients, Amylases, 'Enzyme', exclusions);
    this.hasCellulase = hasCategory(ingredients, Cellulases, 'Enzyme', exclusions);
    this.hasDNase = ingredients.includes(Ingredient.DNase) && !exclusions[Ingredient.DNase]?.includes('Enzyme');
    this.hasLipase = ingredients.includes(Ingredient.Lipase) && !exclusions[Ingredient.Lipase]?.includes('Enzyme');
    this.hasMannanase =
      ingredients.includes(Ingredient.Mannanase) && !exclusions[Ingredient.Mannanase]?.includes('Enzyme');
    this.hasPectinase = hasCategory(ingredients, Pectinases, 'Enzyme', exclusions);
    this.hasProtease = hasCategory(ingredients, Proteases, 'Enzyme', exclusions);
    this.hasOpticalBrighteners = hasCategory(ingredients, OpticalBrighteners, 'Optical Brightener', exclusions);
    this.hasOxygenBleach = hasCategory(ingredients, OxygenBleaches, 'Oxygen Bleach', exclusions);
    this.hasOxygenBleachBoosters = hasCategory(ingredients, OxygenBleachBoosters, 'Oxygen Bleach Booster', exclusions);
    this.hasEnzymes = hasCategory(ingredients, Enzymes, 'Enzyme', exclusions);
    this.hasEnzymeStabilizers = hasCategory(ingredients, EnzymeStabilizers, 'Enzyme Stabilizer', exclusions);
    this.hasAmphotericSurfactants = hasCategory(
      ingredients,
      AmphotericSurfactants,
      'Amphoteric Surfactant',
      exclusions,
    );
    this.hasBuilders = hasCategory(ingredients, Builders, 'Builder', exclusions);
    this.hasFabricAntioxidants = hasCategory(ingredients, FabricAntioxidants, 'Fabric Antioxidant', exclusions);
    this.hasFabricConditioners = hasCategory(ingredients, FabricConditioners, 'Fabric Conditioner', exclusions);
    this.hasFillers = hasCategory(ingredients, Fillers, 'Filler', exclusions);
    this.hasAnionicSurfactants = hasCategory(ingredients, AnionicSurfactants, 'Anionic Surfactant', exclusions);
    this.hasNonionicSurfactants = hasCategory(ingredients, NonionicSurfactants, 'Nonionic Surfactant', exclusions);
    this.hasSulfates = hasCategory(ingredients, Sulfates, 'Sulfate', exclusions);
    this.hasDyes = hasCategory(ingredients, Dyes, 'Dye', exclusions);
    this.hasScents = hasCategory(ingredients, Scents, 'Scent', exclusions);
    this.hasSoaps = hasCategory(ingredients, Soaps, 'Soap', exclusions);
    this.hasProcessingAids = hasCategory(ingredients, ProcessingAids, 'Processing Aid', exclusions);
    this.hasDyeTransferInhibitors = hasCategory(
      ingredients,
      DyeTransferInhibitors,
      'Dye Transfer Inhibitor',
      exclusions,
    );
    this.hasSoilAntiRedepositionAgents = hasCategory(
      ingredients,
      SoilAntiRedeposition,
      'Soil Anti-Redeposition',
      exclusions,
    );
    this.hasSoilReleaseAgents = hasCategory(ingredients, SoilRelease, 'Soil Release', exclusions);
    this.isBiodegradable = !ingredients.some((ing) => NonBiodegradable.has(ing));
    this.isSepticSafe = !ingredients.some((ing) => SepticUnfriendly.has(ing));
  }
}
