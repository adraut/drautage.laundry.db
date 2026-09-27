import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.MEALAS,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.Ethanol,
  Ingredient.MEABorate,
  Ingredient.MEACitrate,
  Ingredient.PolypropyleneTerephthalate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.Fragrance,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumPolyacrylate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.Methylisothiazolinone,
  Ingredient.Mannanase,
  Ingredient.Colorants,
  Ingredient.Cellulase,
  Ingredient.Methylchloroisothiazolinone,
];

const PersilOxiPlusOdorFighter: DetergentProfile = new DetergentProfile(
  'OXI + Odor Fighter',
  'Persil',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
PersilOxiPlusOdorFighter.countriesAvailable = ['USA'];

export default PersilOxiPlusOdorFighter;
