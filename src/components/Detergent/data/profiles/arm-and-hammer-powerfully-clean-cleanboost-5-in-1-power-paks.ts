import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.MEADedecylbenzenesulfonate,
  Ingredient.DipropyleneGlycol,
  Ingredient.C10_16Alketh,
  Ingredient.Water,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.PalmKernelAcid,
  Ingredient.Fragrance,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.DenatoniumBenzoate,
  Ingredient.Ethanolamine,
  Ingredient.Colorants,
];

const ArmAndHammerPowerfullyCleanCleanBoost5In1PowerPaks: DetergentProfile = new DetergentProfile(
  'Powerfully Clean CleanBoost 5-in-1 Power Paks',
  'Arm & Hammer',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerPowerfullyCleanCleanBoost5In1PowerPaks.countriesAvailable = ['USA'];

export default ArmAndHammerPowerfullyCleanCleanBoost5In1PowerPaks;
