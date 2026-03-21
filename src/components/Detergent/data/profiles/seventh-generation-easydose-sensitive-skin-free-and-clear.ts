import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.PropyleneGlycol,
  Ingredient.CaprylylCaprylGlucoside,
  Ingredient.Glycerin,
  Ingredient.SodiumOleate,
  Ingredient.SodiumChloride,
  Ingredient.CitricAcid,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
];

const SeventhGenerationEasyDoseSensitiveSkinFreeAndClear: DetergentProfile = new DetergentProfile(
  'EasyDose Sensitive Skin Free & Clear',
  'Seventh Generation',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
SeventhGenerationEasyDoseSensitiveSkinFreeAndClear.countriesAvailable = ['USA'];
export default SeventhGenerationEasyDoseSensitiveSkinFreeAndClear;
