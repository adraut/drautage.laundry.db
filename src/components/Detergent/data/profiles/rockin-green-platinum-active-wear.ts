import { Ingredient } from '../../../common/types/Ingredient';
import { DataSource } from '../../types/DataSource';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumPercarbonate,
  Ingredient.LinearAlcoholEthoxylates,
  Ingredient.SaltCake,
  Ingredient.Lipase,
  Ingredient.Mannanase,
  Ingredient.Protease,
  Ingredient.TeaTreeOil,
];

const RockinGreenPlatinumActiveWear: DetergentProfile = new DetergentProfile(
  'Platinum Active Wear',
  "Rockin' Green",
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-02-01'),
);
RockinGreenPlatinumActiveWear.countryOfOrigin = 'USA';
RockinGreenPlatinumActiveWear.countriesAvailable = ['USA'];
export default RockinGreenPlatinumActiveWear;
