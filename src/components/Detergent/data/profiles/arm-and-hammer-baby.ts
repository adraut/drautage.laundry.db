import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumHydroxide,
  Ingredient.Fragrance,
];

const ArmAndHammerBaby: DetergentProfile = new DetergentProfile(
  'Baby',
  'Arm & Hammer',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerBaby.countriesAvailable = ['USA'];

export default ArmAndHammerBaby;
