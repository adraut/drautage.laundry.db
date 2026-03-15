import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumBicarbonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.SodiumHydroxide,
  Ingredient.SodiumCarbonate,
  Ingredient.PentasodiumPentetate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Fragrance,
  Ingredient.Colorants,
];

const ArmAndHammerDeepCleanStainFormulaSparklingClean: DetergentProfile = new DetergentProfile(
  'Deep Clean Stain Formula Sparkling Clean',
  'Arm & Hammer',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerDeepCleanStainFormulaSparklingClean.countriesAvailable = ['USA'];

export default ArmAndHammerDeepCleanStainFormulaSparklingClean;
