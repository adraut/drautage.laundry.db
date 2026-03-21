import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  'Citrus',
  '9 Elements',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);

export default NineElementsLaundryDetergentCitrus;
