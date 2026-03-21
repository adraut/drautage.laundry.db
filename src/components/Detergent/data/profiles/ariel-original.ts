import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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

const ArielOriginal: DetergentProfile = new DetergentProfile(
  'Original',
  'Ariel',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArielOriginal.countriesAvailable = ['USA', 'MEX'];

export default ArielOriginal;
