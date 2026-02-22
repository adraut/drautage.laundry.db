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
  Ingredient.SodiumPolyacrylate,
  Ingredient.C10_16Pareth,
  Ingredient.Fragrance,
  Ingredient.FluorescentBrightener71,
  Ingredient.OrganosiliconeCopolymer,
  Ingredient.Subtilisin,
  Ingredient.Lipase,
  Ingredient.PigmentGreen7,
  Ingredient.ChromophoreSubstitutedPolyoxyalkylene,
];

const GainUltraOriginalPowder: DetergentProfile = new DetergentProfile(
  'Ultra Original',
  'Gain',
  DetergentType.Powder,
  ingredients,
  new Date('2026-02-22'),
);
GainUltraOriginalPowder.countryOfOrigin = 'USA';
GainUltraOriginalPowder.countriesAvailable = ['USA'];

export default GainUltraOriginalPowder;
