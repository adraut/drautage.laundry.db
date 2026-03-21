import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCarbonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumChloride,
  Ingredient.SodiumBicarbonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumHydroxide,
  Ingredient.Polyquaternium7,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.PentasodiumPentetate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
  Ingredient.Fragrance,
  Ingredient.Colorants,
];

const ArmAndHammerDetergentPlusSoftenerOrchardBloom: DetergentProfile = new DetergentProfile(
  'Detergent Plus Softener Orchard Bloom',
  'Arm & Hammer',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerDetergentPlusSoftenerOrchardBloom.countriesAvailable = ['USA'];

export default ArmAndHammerDetergentPlusSoftenerOrchardBloom;
