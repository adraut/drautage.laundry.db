import { Alpha3Code } from 'i18n-iso-countries';
import { DetergentType } from './DetergentType';
import { Ingredient } from '../../common/types/Ingredient';
import { Soaps } from '../../common/types/Soaps';
import { SepticUnfriendly } from '../../common/types/SepticUnfriendly';
import { Scents } from '../../common/types/Scents';
import { OpticalBrighteners } from '../../common/types/OpticalBrighteners';
import { Enzymes, Proteases, Pectinases, Amylases, Cellulases } from '../../common/types/Enzymes';
import { Dyes } from '../../common/types/Dyes';
import { NonBiodegradable } from '../../common/types/NonBiodegradable';
import { NonionicSurfactants } from '../../common/types/NonionicSurfactants';
import { AnionicSurfactants } from '../../common/types/AnionicSurfactants';
import { OxygenBleaches } from '../../common/types/OxygenBleaches';
import { DyeTransferInhibitors } from '../../common/types/DyeTransferInhibitors';
import { SoilAntiRedeposition } from '../../common/types/SoilAntiRedeposition';
import { SoilRelease } from '../../common/types/SoilRelease';
import { DataSource } from './DataSource';

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
  readonly hasAmylase: boolean;
  readonly hasCellulase: boolean;
  readonly hasDNase: boolean;
  readonly hasLipase: boolean;
  readonly hasMannanase: boolean;
  readonly hasPectinase: boolean;
  readonly hasProtease: boolean;
  readonly hasOpticalBrighteners: boolean;
  readonly hasOxygenBleach: boolean;
  readonly hasTAED: boolean;
  readonly hasEnzymes: boolean;
  readonly hasAnionicSurfactants: boolean;
  readonly hasNonionicSurfactants: boolean;
  readonly hasDyes: boolean;
  readonly hasScents: boolean;
  readonly hasSoaps: boolean;
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
  ) {
    this.name = name;
    this.brand = brand;
    this.type = type;
    this.dataSource = dataSource;
    this.ingredients = ingredients;
    this.lastUpdated = lastUpdated;
    this.lastUpdatedFormatted = this.lastUpdated.toISOString().split('T')[0];

    // Compute all derived properties once during construction
    this.hasAmylase = ingredients.some((ing) => Amylases.has(ing));
    this.hasCellulase = ingredients.some((ing) => Cellulases.has(ing));
    this.hasDNase = ingredients.includes(Ingredient.DNase);
    this.hasLipase = ingredients.includes(Ingredient.Lipase);
    this.hasMannanase = ingredients.includes(Ingredient.Mannanase);
    this.hasPectinase = ingredients.some((ing) => Pectinases.has(ing));
    this.hasProtease = ingredients.some((ing) => Proteases.has(ing));
    this.hasOpticalBrighteners = ingredients.some((ing) => OpticalBrighteners.has(ing));
    this.hasOxygenBleach = ingredients.some((ing) => OxygenBleaches.has(ing));
    this.hasTAED = ingredients.includes(Ingredient.TAED);
    this.hasEnzymes = ingredients.some((ing) => Enzymes.has(ing));
    this.hasAnionicSurfactants = ingredients.some((ing) => AnionicSurfactants.has(ing));
    this.hasNonionicSurfactants = ingredients.some((ing) => NonionicSurfactants.has(ing));
    this.hasDyes = ingredients.some((ing) => Dyes.has(ing));
    this.hasScents = ingredients.some((ing) => Scents.has(ing));
    this.hasSoaps = ingredients.some((ing) => Soaps.has(ing));
    this.hasDyeTransferInhibitors = ingredients.some((ing) => DyeTransferInhibitors.has(ing));
    this.hasSoilAntiRedepositionAgents = ingredients.some((ing) => SoilAntiRedeposition.has(ing));
    this.hasSoilReleaseAgents = ingredients.some((ing) => SoilRelease.has(ing));
    this.isBiodegradable = !ingredients.some((ing) => NonBiodegradable.has(ing));
    this.isSepticSafe = !ingredients.some((ing) => SepticUnfriendly.has(ing));
  }
}
