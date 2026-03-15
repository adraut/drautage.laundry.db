import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.MEADedecylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.DipropyleneGlycol,
  Ingredient.Water,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.Fragrance,
  Ingredient.PalmKernelAcid,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.Ethanolamine,
  Ingredient.Colorants,
];

const ArmAndHammerDeepCleanOdorFormula: DetergentProfile = new DetergentProfile(
  'Deep Clean Odor Formula',
  'Arm & Hammer',
  DetergentType.Pod,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerDeepCleanOdorFormula.countriesAvailable = ['USA'];

export default ArmAndHammerDeepCleanOdorFormula;
