import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.MEADedecylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.DipropyleneGlycol,
  Ingredient.Water,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.PalmKernelAcid,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.Ethanolamine,
];

const ArmAndHammerDeepCleanFreeAndClearPods: DetergentProfile = new DetergentProfile(
  'Deep Clean Free & Clear',
  'Arm & Hammer',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerDeepCleanFreeAndClearPods.countriesAvailable = ['USA'];

export default ArmAndHammerDeepCleanFreeAndClearPods;
