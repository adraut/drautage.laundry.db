import { Ingredient } from '../../../common/types/Ingredient';
import { BoosterProfile } from '../../types/BoosterProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumPercarbonate,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumPolyitaconate,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Lipase,
  Ingredient.Mannanase,
  Ingredient.PectateLyase,
  Ingredient.Protease,
];

const FebuEnzymeOxygenLaundryBoosterFragranceFree: BoosterProfile = new BoosterProfile(
  'Enzyme Oxygen Laundry Booster Fragrance Free',
  'FEBU',
  ProductType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-09-29'),
);

export default FebuEnzymeOxygenLaundryBoosterFragranceFree;
