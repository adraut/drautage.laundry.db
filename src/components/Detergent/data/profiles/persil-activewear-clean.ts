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
  Ingredient.Fragrance,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PolypropyleneTerephthalate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.Glycerin,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumPolyacrylate,
  Ingredient.Maltodextrin,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Methylisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Colorants,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.Methylchloroisothiazolinone,
  Ingredient.Ethanol,
];

const PersilActivewearClean: DetergentProfile = new DetergentProfile(
  'Activewear Clean + Odor Lifter',
  'Persil',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
PersilActivewearClean.countriesAvailable = ['USA'];

export default PersilActivewearClean;
