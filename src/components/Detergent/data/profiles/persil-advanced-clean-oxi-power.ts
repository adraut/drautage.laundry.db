import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.MEALAS,
  Ingredient.PropyleneGlycol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.MEABorate,
  Ingredient.Fragrance,
  Ingredient.Ethanol,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer,
  Ingredient.Protease,
  Ingredient.SodiumMetaborate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.Methylisothiazolinone,
  Ingredient.Mannanase,
  Ingredient.Colorants,
  Ingredient.Cellulase,
  Ingredient.Methylchloroisothiazolinone,
];

const PersilAdvancedCleanOxiPower: DetergentProfile = new DetergentProfile(
  'Advanced Clean OXI Power Odor Fighting',
  'Persil',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
PersilAdvancedCleanOxiPower.countriesAvailable = ['USA'];

export default PersilAdvancedCleanOxiPower;
