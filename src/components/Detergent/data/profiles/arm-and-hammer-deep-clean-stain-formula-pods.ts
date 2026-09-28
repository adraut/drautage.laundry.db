import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.MEADedecylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.DipropyleneGlycol,
  Ingredient.Water,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.PalmKernelAcid,
  Ingredient.Fragrance,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.DenatoniumBenzoate,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.Ethanolamine,
  Ingredient.Protease,
  Ingredient.Colorants,
];

const ArmAndHammerDeepCleanStainFormulaPods: DetergentProfile = new DetergentProfile(
  'Deep Clean Stain Formula',
  'Arm & Hammer',
  ProductType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerDeepCleanStainFormulaPods.countriesAvailable = ['USA'];

export default ArmAndHammerDeepCleanStainFormulaPods;
