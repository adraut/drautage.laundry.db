import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCarbonatePeroxide,
  Ingredient.SodiumSilicate,
  Ingredient.TAED,
  Ingredient.Zeolite,
  Ingredient.Water,
  Ingredient.C10_16Pareth,
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
  Ingredient.PigmentBlue15,
];

const TidePlusBleachPowder: DetergentProfile = new DetergentProfile(
  'Plus Bleach',
  'Tide',
  DetergentType.Powder,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusBleachPowder.countryOfOrigin = 'USA';
TidePlusBleachPowder.countriesAvailable = ['USA'];

export default TidePlusBleachPowder;
