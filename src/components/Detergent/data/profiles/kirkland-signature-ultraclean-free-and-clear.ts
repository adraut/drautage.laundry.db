import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.MEALAS,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.Triethanolamine,
  Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.LinearAlkylbenzeneSulfonicAcid, // also listed as: Alkylbenzene Sulfonic Acid
  Ingredient.Ethanol,
  Ingredient.Protease,
  Ingredient.SodiumCitrate,
  Ingredient.CalciumChloride,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.Methylisothiazolinone,
  Ingredient.Mannanase,
  Ingredient.Methylchloroisothiazolinone,
];

const KirklandSignatureUltraCleanFreeAndClear: DetergentProfile = new DetergentProfile(
  'UltraClean Free and Clear',
  'Kirkland Signature',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-02-01'),
);
KirklandSignatureUltraCleanFreeAndClear.countryOfOrigin = 'USA';
KirklandSignatureUltraCleanFreeAndClear.countriesAvailable = ['AUS', 'USA'];
export default KirklandSignatureUltraCleanFreeAndClear;
