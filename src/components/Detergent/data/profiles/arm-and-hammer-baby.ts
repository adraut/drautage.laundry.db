import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

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
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerBaby.countriesAvailable = ['USA'];

export default ArmAndHammerBaby;
