import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCarbonatePeroxide,
  Ingredient.SodiumSilicate,
  Ingredient.Zeolite,
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.TAED,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CelluloseGum,
  Ingredient.Fragrance,
  Ingredient.C16_18FattyAcidsSodiumSalt,
  Ingredient.FluorescentBrightener71,
  Ingredient.AnionicModifiedPolyester,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.OrganosiliconeCopolymer,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.PigmentBlue15,
];

const TidePlusATouchOfDownyPowder: DetergentProfile = new DetergentProfile(
  'Plus A Touch of Downy',
  'Tide',
  DetergentType.Powder,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusATouchOfDownyPowder.countryOfOrigin = 'USA';
TidePlusATouchOfDownyPowder.countriesAvailable = ['USA'];

export default TidePlusATouchOfDownyPowder;
