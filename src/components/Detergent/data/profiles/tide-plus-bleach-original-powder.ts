import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
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
  Ingredient.Simethicone,
  Ingredient.SodiumSulfate,
  Ingredient.CalciumCarbonate,
  Ingredient.C16_18FattyAcidsSodiumSalt,
  Ingredient.Colorants,
  Ingredient.Fragrance,
  Ingredient.Water,
];

const TidePlusBleachOriginalPowder: DetergentProfile = new DetergentProfile(
  '+ Bleach Original',
  'Tide',
  DetergentType.Powder,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
TidePlusBleachOriginalPowder.countryOfOrigin = 'USA';
TidePlusBleachOriginalPowder.countriesAvailable = ['USA'];

export default TidePlusBleachOriginalPowder;
