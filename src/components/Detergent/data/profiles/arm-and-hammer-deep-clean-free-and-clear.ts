import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumBicarbonate,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.SodiumHydroxide,
];

const ArmAndHammerDeepCleanFreeAndClear: DetergentProfile = new DetergentProfile(
  'Deep Clean Free & Clear',
  'Arm & Hammer',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
ArmAndHammerDeepCleanFreeAndClear.countriesAvailable = ['USA'];

export default ArmAndHammerDeepCleanFreeAndClear;
