import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.MEALAS,
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.PropyleneGlycol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PEG_10,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Protease,
  Ingredient.DenatoniumBenzoate,
  Ingredient.Amylase,
  Ingredient.Colorants,
  Ingredient.Mannanase,
];

const GreatValueUltimateFreshOriginalCleanPacs: DetergentProfile = new DetergentProfile(
  'Ultimate Fresh',
  'Great Value',
  ProductType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);

export default GreatValueUltimateFreshOriginalCleanPacs;
