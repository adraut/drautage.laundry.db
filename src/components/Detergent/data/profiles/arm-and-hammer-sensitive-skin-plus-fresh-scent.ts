import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCarbonate,
  Ingredient.Fragrance,
  Ingredient.PentasodiumPentetate,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumHydroxide,
];

const ArmAndHammerSensitiveSkinPlusFreshScent: DetergentProfile = new DetergentProfile(
  'Sensitive Skin Plus Fresh Scent',
  'Arm & Hammer',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerSensitiveSkinPlusFreshScent.countriesAvailable = ['USA'];

export default ArmAndHammerSensitiveSkinPlusFreshScent;
