import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.PentasodiumPentetate,
  Ingredient.Fragrance,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumHydroxide,
  Ingredient.Colorants,
];

const ArmAndHammerPowerfullyCleanCleanBurst: DetergentProfile = new DetergentProfile(
  'Powerfully Clean Clean Burst',
  'Arm & Hammer',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerPowerfullyCleanCleanBurst.countriesAvailable = ['USA'];

export default ArmAndHammerPowerfullyCleanCleanBurst;
