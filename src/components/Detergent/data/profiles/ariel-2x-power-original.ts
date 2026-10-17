import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumSilicate,
  Ingredient.Water,
  Ingredient.CalciumCarbonate,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Bentonite,
  Ingredient.C10_16Alketh,
  Ingredient.Fragrance,
  Ingredient.CelluloseGum,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.FluorescentBrightener71,
  Ingredient.Subtilisin,
  Ingredient.Colorants,
  Ingredient.Lipase,
];

const Ariel2xPowerOriginal: DetergentProfile = new DetergentProfile(
  '2x Power Original',
  'Ariel',
  ProductType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
Ariel2xPowerOriginal.countriesAvailable = ['USA', 'MEX'];

export default Ariel2xPowerOriginal;
