import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumSilicate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CelluloseGum,
  Ingredient.Subtilisin,
  Ingredient.Lipase,
  Ingredient.SodiumSulfate,
  Ingredient.Bentonite,
  Ingredient.Zeolite,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.FluorescentBrightener71,
  Ingredient.Fragrance,
  Ingredient.Colorants,
  Ingredient.Water,
];

const ArielTouchOfDownyPowder: DetergentProfile = new DetergentProfile(
  'Touch of Downy',
  'Ariel',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArielTouchOfDownyPowder.countriesAvailable = ['USA'];

export default ArielTouchOfDownyPowder;
