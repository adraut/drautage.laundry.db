import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumChloride,
  Ingredient.Fragrance,
  Ingredient.SodiumPolyacrylate,
  Ingredient.SodiumCarbonate,
  Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts,
  Ingredient.FluorescentBrightener28,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.Methylisothiazolinone,
  Ingredient.Colorants,
];

const PurexAdvancedOxiWithOdorFighterFreshMorning: DetergentProfile = new DetergentProfile(
  'Advanced OXI with Odor Fighter Fresh Morning',
  'Purex',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
PurexAdvancedOxiWithOdorFighterFreshMorning.countriesAvailable = ['USA'];
export default PurexAdvancedOxiWithOdorFighterFreshMorning;
