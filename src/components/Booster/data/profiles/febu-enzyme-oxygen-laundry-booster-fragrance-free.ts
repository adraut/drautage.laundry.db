import { Ingredient } from '../../../common/types/Ingredient';
import { BoosterProfile } from '../../types/BoosterProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  // SDS CAS 497-19-8
  Ingredient.SodiumCarbonate,
  // SDS CAS 15630-89-4
  Ingredient.SodiumPercarbonate,
  // SDS CAS 6132-04-3
  Ingredient.SodiumCitrate,
  // SDS lists Sodium Polyitaconate, CAS 26099-89-8 (no zinc; likely older formula).
  // Package lists Sodium Zinc Polyitaconate, CAS 1662663-05-9 (not from SDS).
  Ingredient.SodiumZincPolyitaconate,
  // Not on SDS; listed on current package. Placed before enzymes (position assumed).
  Ingredient.SodiumSilicate,
  // SDS CAS 9003-98-9
  Ingredient.Deoxyribonuclease,
  // SDS CAS 9000-90-2
  Ingredient.Amylase,
  // SDS CAS 9012-54-8
  Ingredient.Cellulase,
  // SDS CAS 9001-62-1
  Ingredient.Lipase,
  // SDS CAS 37288-54-3
  Ingredient.Mannanase,
  // SDS CAS 9015-75-2
  Ingredient.PectateLyase,
  // SDS CAS 9001-92-7
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
FebuEnzymeOxygenLaundryBoosterFragranceFree.countriesAvailable = ['USA', 'CAN'];

export default FebuEnzymeOxygenLaundryBoosterFragranceFree;
