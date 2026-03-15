import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.MEADedecylbenzenesulfonate,
  Ingredient.DipropyleneGlycol,
  Ingredient.C10_16Pareth,
  Ingredient.Water,
  Ingredient.C12_13Pareth_2,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.PalmKernelAcid,
  Ingredient.Fragrance,
  Ingredient.Colorants,
  Ingredient.DenatoniumBenzoate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
];

const ArmAndHammerPlusOxiCleanWithOdorBlasters5In1PowerPaks: DetergentProfile = new DetergentProfile(
  'Plus OxiClean with Odor Blasters 5-in-1 Power Paks',
  'Arm & Hammer',
  DetergentType.Pod,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerPlusOxiCleanWithOdorBlasters5In1PowerPaks.countriesAvailable = ['USA'];

export default ArmAndHammerPlusOxiCleanWithOdorBlasters5In1PowerPaks;
