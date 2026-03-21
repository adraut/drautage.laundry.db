import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.SodiumBicarbonate,
  Ingredient.PentasodiumPentetate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumHydroxide,
];

const ArmAndHammerFreeAndClearSensitiveSkin: DetergentProfile = new DetergentProfile(
  'Free & Clear Sensitive Skin',
  'Arm & Hammer',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerFreeAndClearSensitiveSkin.countriesAvailable = ['USA'];

export default ArmAndHammerFreeAndClearSensitiveSkin;
