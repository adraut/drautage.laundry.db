import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumChloride,
  Ingredient.Fragrance,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.CalciumChloride,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.PentasodiumPentetate,
  Ingredient.Tromethamine,
  Ingredient.Amylase,
  Ingredient.Protease,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
  Ingredient.Colorants,
];

const ArmAndHammerPlusOxiCleanUltraStainFighters: DetergentProfile = new DetergentProfile(
  'Plus OxiClean Ultra Stain Fighters',
  'Arm & Hammer',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
ArmAndHammerPlusOxiCleanUltraStainFighters.countriesAvailable = ['USA'];

export default ArmAndHammerPlusOxiCleanUltraStainFighters;
