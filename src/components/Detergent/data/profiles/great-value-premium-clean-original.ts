import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.Triethanolamine,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.MEACitrate,
  Ingredient.SodiumCitrate,
  Ingredient.Ethanolamine,
  Ingredient.FluorescentBrightener28,
  Ingredient.Ethanol,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Protease,
  Ingredient.CalciumChloride,
  Ingredient.Methylisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Colorants,
  Ingredient.Methylchloroisothiazolinone,
];

const GreatValuePremiumCleanOriginal: DetergentProfile = new DetergentProfile(
  'Premium Clean',
  'Great Value',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);

export default GreatValuePremiumCleanOriginal;
