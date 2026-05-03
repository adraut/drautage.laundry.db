import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumDodecylbenzenesulfonate,
  Ingredient.SodiumPercarbonate,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumSilicate,
  Ingredient.TAED,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CelluloseGum,
  Ingredient.Zeolite,
  Ingredient.Water,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.FluorescentBrightener71,
  Ingredient.Fragrance,
  Ingredient.Colorants,
  Ingredient.Dimethicone,
];

const KirklandSignatureMultipurposePowderFreshScent: DetergentProfile = new DetergentProfile(
  'Multipurpose Powder Fresh Scent',
  'Kirkland Signature',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-05-03'),
);
KirklandSignatureMultipurposePowderFreshScent.countriesAvailable = ['USA'];
export default KirklandSignatureMultipurposePowderFreshScent;
