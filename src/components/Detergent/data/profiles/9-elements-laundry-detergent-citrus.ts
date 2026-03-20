import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.CitricAcid,
  Ingredient.C12_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCitrate,
  Ingredient.Fragrance,
  Ingredient.Vinegar,
];

const NineElementsLaundryDetergentCitrus: DetergentProfile = new DetergentProfile(
  'Laundry Detergent',
  '9 Elements',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);

export default NineElementsLaundryDetergentCitrus;
