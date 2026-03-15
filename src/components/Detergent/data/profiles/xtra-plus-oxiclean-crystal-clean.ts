import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumHydroxide,
  Ingredient.SodiumChloride,
  Ingredient.PentasodiumPentetate,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const XtraPlusOxiCleanCrystalClean: DetergentProfile = new DetergentProfile(
  'Plus OxiClean',
  'Xtra',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
XtraPlusOxiCleanCrystalClean.countryOfOrigin = 'USA';
XtraPlusOxiCleanCrystalClean.countriesAvailable = ['USA'];

export default XtraPlusOxiCleanCrystalClean;
