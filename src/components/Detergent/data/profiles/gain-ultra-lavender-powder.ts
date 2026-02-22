import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumSilicate,
  Ingredient.Water,
  Ingredient.Bentonite,
  Ingredient.Zeolite,
  Ingredient.C10_16Pareth,
  Ingredient.Fragrance,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CelluloseGum,
  Ingredient.FluorescentBrightener71,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.OrganosiliconeCopolymer,
  Ingredient.Subtilisin,
  Ingredient.PigmentGreen7,
  Ingredient.ChromophoreSubstitutedPolyoxyalkylene,
];

const GainUltraLavenderPowder: DetergentProfile = new DetergentProfile(
  'Ultra Lavender',
  'Gain',
  DetergentType.Powder,
  ingredients,
  new Date('2026-02-22'),
);
GainUltraLavenderPowder.countryOfOrigin = 'USA';
GainUltraLavenderPowder.countriesAvailable = ['USA'];

export default GainUltraLavenderPowder;
