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
  Ingredient.Amylase,
  Ingredient.Lipase,
  Ingredient.FluorescentBrightener71,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SimethiconeDimethicone,
  Ingredient.SodiumSulfate,
  Ingredient.CalciumCarbonate,
  Ingredient.C16_18FattyAcidsSodiumSalt,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TideUltraOxiPowder: DetergentProfile = new DetergentProfile(
  'Ultra OXI',
  'Tide',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-27'),
);
TideUltraOxiPowder.countryOfOrigin = 'USA';
TideUltraOxiPowder.countriesAvailable = ['USA'];

export default TideUltraOxiPowder;
