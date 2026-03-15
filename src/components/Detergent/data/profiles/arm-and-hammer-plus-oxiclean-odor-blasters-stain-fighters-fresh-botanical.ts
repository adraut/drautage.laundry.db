import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Glycerin,
  Ingredient.Fragrance,
  Ingredient.SodiumBorate,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.CalciumChloride,
  Ingredient.SodiumFormate,
  Ingredient.CitricAcid,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.PentasodiumPentetate,
  Ingredient.Amylase,
  Ingredient.Protease,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
  Ingredient.Colorants,
];

const ArmAndHammerPlusOxiCleanOdorBlastersStainFightersFreshBotanical: DetergentProfile = new DetergentProfile(
  'Plus OxiClean Odor Blasters Stain Fighters Fresh Botanical',
  'Arm & Hammer',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerPlusOxiCleanOdorBlastersStainFightersFreshBotanical.countriesAvailable = ['USA'];

export default ArmAndHammerPlusOxiCleanOdorBlastersStainFightersFreshBotanical;
