import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCarbonate,
  Ingredient.Fragrance,
  Ingredient.SodiumBicarbonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.SodiumHydroxide,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.PentasodiumPentetate,
  Ingredient.Colorants,
];

const ArmAndHammerDeepCleanOdorFormulaLiquidRadiantBurst: DetergentProfile = new DetergentProfile(
  'Deep Clean Odor Formula',
  'Arm & Hammer',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerDeepCleanOdorFormulaLiquidRadiantBurst.countriesAvailable = ['USA'];

export default ArmAndHammerDeepCleanOdorFormulaLiquidRadiantBurst;
