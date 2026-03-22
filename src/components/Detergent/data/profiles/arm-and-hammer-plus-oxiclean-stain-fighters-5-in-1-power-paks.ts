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

const ArmAndHammerPlusOxiCleanStainFighters5In1PowerPaks: DetergentProfile = new DetergentProfile(
  'Plus OxiClean Stain Fighters 5-in-1 Power Paks',
  'Arm & Hammer',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerPlusOxiCleanStainFighters5In1PowerPaks.countriesAvailable = ['USA'];

export default ArmAndHammerPlusOxiCleanStainFighters5In1PowerPaks;
