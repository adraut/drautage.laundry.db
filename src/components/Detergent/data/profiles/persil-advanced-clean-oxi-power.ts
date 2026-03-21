import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  Ingredient.Methylchloroisothiazolinone,
  Ingredient.Cellulase,
];

const PersilAdvancedCleanOxiPower: DetergentProfile = new DetergentProfile(
  'Advanced Clean OXI Power Odor Fighting',
  'Persil',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
PersilAdvancedCleanOxiPower.countriesAvailable = ['USA'];

export default PersilAdvancedCleanOxiPower;
