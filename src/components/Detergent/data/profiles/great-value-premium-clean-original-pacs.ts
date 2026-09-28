import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.MEALAS,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.Water,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Glycerin,
  Ingredient.MEACocoate,
  Ingredient.MEACitrate,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.Protease,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Amylase,
  Ingredient.PentasodiumPentetate,
  Ingredient.Mannanase,
  Ingredient.Lipase,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Fragrance,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Colorants,
  Ingredient.DenatoniumBenzoate,
];

const GreatValuePremiumCleanOriginalPacs: DetergentProfile = new DetergentProfile(
  'Premium Clean',
  'Great Value',
  ProductType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);

export default GreatValuePremiumCleanOriginalPacs;
