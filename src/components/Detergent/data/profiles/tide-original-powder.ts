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
  Ingredient.C10_16Alketh,
  Ingredient.TAED,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Fragrance,
  Ingredient.CelluloseGum,
  Ingredient.C16_18FattyAcidsSodiumSalt,
  Ingredient.FluorescentBrightener71,
  Ingredient.AnionicModifiedPolyester,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.OrganosiliconeCopolymer,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Lipase,
  Ingredient.PigmentBlue15,
];

const TideOriginalPowder: DetergentProfile = new DetergentProfile(
  'Original',
  'Tide',
  DetergentType.Powder,
  ingredients,
  new Date('2026-03-14'),
);
TideOriginalPowder.countryOfOrigin = 'USA';
TideOriginalPowder.countriesAvailable = ['USA'];

export default TideOriginalPowder;
