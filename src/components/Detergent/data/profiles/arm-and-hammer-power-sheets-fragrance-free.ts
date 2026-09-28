import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyvinylAlcohol,
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.Glycerin,
  Ingredient.SodiumCitrate,
  Ingredient.PEG7GlycerylCocoate,
  Ingredient.PEG12Dimethicone,
  Ingredient.MethoxyPEG10Cocoate,
  Ingredient.Saponins,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCarbonate,
  Ingredient.Benzisothiazolinone,
];

const ArmAndHammerPowerSheetsFragranceFree: DetergentProfile = new DetergentProfile(
  'Power Sheets Fragrance Free',
  'Arm & Hammer',
  ProductType.Sheet,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerPowerSheetsFragranceFree.countriesAvailable = ['USA'];

export default ArmAndHammerPowerSheetsFragranceFree;
