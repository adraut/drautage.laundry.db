import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.MEALAS,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.MEABorate,
  Ingredient.MEACitrate,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.Fragrance,
  Ingredient.PolypropyleneTerephthalate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumPolyacrylate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Methylisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Colorants,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.Methylchloroisothiazolinone,
  Ingredient.Ethanol,
];

const PersilIntenseFresh: DetergentProfile = new DetergentProfile(
  'Intense Fresh',
  'Persil',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
PersilIntenseFresh.countriesAvailable = ['USA'];

export default PersilIntenseFresh;
