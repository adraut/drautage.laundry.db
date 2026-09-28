import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyvinylAlcohol,
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.Glycerin,
  Ingredient.SodiumCitrate,
  Ingredient.Phenoxyethanol,
  Ingredient.Protease,
];

const SeventhGenerationFreeAndClearLaundryDetergentSheets: DetergentProfile = new DetergentProfile(
  'Free & Clear Laundry Detergent Sheets',
  'Seventh Generation',
  ProductType.Sheet,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
SeventhGenerationFreeAndClearLaundryDetergentSheets.countriesAvailable = ['USA'];

export default SeventhGenerationFreeAndClearLaundryDetergentSheets;
