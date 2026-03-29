import { Ingredient } from './Ingredient';

/**
 * Lipid-soluble hindered phenol antioxidants that deposit onto textile fibers during the wash
 * cycle and provide residual protection against oxidative degradation of oils (sebum, body oils)
 * retained in the fabric between wears. By interrupting lipid peroxidation chain reactions on
 * the fiber surface, these ingredients inhibit the formation of rancidity-derived volatile
 * compounds (aldehydes, ketones) that cause stale-laundry odors.
 *
 * Distinct from `Preservatives`, which protect the detergent formulation itself from oxidative
 * or microbial degradation. Ingredients in this set typically appear in both sets because they
 * serve both roles simultaneously.
 *
 * Distinct from `OdorEliminators`, which act reactively (encapsulation, neutralization, or
 * antimicrobial suppression). Fabric antioxidants act preventatively by slowing oxidative
 * odor precursor formation on the textile.
 */
const FabricAntioxidants: Set<Ingredient> = new Set();

// Alphabetical by enum key name
FabricAntioxidants.add(Ingredient.MethylDiTButylHydroxycinnimate);
FabricAntioxidants.add(Ingredient.MethylDiTButylHydroxyhydrocinnamate);

export { FabricAntioxidants };
