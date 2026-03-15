import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumOleate,
  Ingredient.SodiumSulfate,
  Ingredient.CitricAcid,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
];

const SeventhGenerationSensitiveSkinFreeAndClear: DetergentProfile = new DetergentProfile(
  'Sensitive Skin Free & Clear',
  'Seventh Generation',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-15'),
);
SeventhGenerationSensitiveSkinFreeAndClear.countriesAvailable = ['USA'];
export default SeventhGenerationSensitiveSkinFreeAndClear;
