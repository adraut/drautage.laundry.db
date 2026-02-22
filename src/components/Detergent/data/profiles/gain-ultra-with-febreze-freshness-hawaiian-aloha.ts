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

const GainUltraWithFebrezeFreshnessHawaiianAloha: DetergentProfile = new DetergentProfile(
  'Ultra with Febreze Freshness Hawaiian Aloha',
  'Gain',
  DetergentType.Powder,
  ingredients,
  new Date('2026-02-22'),
);
GainUltraWithFebrezeFreshnessHawaiianAloha.countryOfOrigin = 'USA';
GainUltraWithFebrezeFreshnessHawaiianAloha.countriesAvailable = ['USA'];

export default GainUltraWithFebrezeFreshnessHawaiianAloha;
