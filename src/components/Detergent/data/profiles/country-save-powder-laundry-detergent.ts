import { Ingredient } from '../../../common/types/Ingredient';
import { DataSource } from '../../types/DataSource';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.Laureth_7,
  Ingredient.SodiumChloride,
  Ingredient.SodiumMetasilicate,
];

const CountrySavePowderLaundryDetergent: DetergentProfile = new DetergentProfile(
  'Powder Laundry Detergent',
  'Country Save',
  DetergentType.Powder,
  DataSource.SDS,
  ingredients,
  new Date('2026-02-08'),
);
CountrySavePowderLaundryDetergent.countryOfOrigin = 'USA';
CountrySavePowderLaundryDetergent.countriesAvailable = ['USA'];
export default CountrySavePowderLaundryDetergent;
