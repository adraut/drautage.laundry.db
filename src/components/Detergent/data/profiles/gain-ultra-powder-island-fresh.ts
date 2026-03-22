import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumSilicate,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CelluloseGum,
  Ingredient.AnionicModifiedPolyester,
  Ingredient.SodiumPercarbonate,
  Ingredient.TAED,
  Ingredient.Subtilisin,
  Ingredient.Lipase,
  Ingredient.FluorescentBrightener71,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SimethiconeDimethicone,
  Ingredient.SodiumSulfate,
  Ingredient.CalciumCarbonate,
  Ingredient.Bentonite,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const GainUltraPowderIslandFresh: DetergentProfile = new DetergentProfile(
  'Ultra Powder Island Fresh',
  'Gain',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
GainUltraPowderIslandFresh.countryOfOrigin = 'USA';
GainUltraPowderIslandFresh.countriesAvailable = ['USA'];

export default GainUltraPowderIslandFresh;
