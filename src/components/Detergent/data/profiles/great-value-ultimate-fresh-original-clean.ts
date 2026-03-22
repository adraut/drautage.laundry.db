import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.Triethanolamine,
  Ingredient.Fragrance,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.ModifiedStarchPolymer,
  Ingredient.FluorescentBrightener28,
  Ingredient.SodiumPolyacrylate,
  Ingredient.CalciumChloride,
  Ingredient.Methylisothiazolinone,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Colorants,
  Ingredient.Methylchloroisothiazolinone,
];

const GreatValueUltimateFreshOriginalClean: DetergentProfile = new DetergentProfile(
  'Ultimate Fresh',
  'Great Value',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);

export default GreatValueUltimateFreshOriginalClean;
