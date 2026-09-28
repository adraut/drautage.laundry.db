import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.CitricAcid,
  Ingredient.C12_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCitrate,
  Ingredient.Fragrance,
  Ingredient.Vinegar,
];

const NineElementsLaundryDetergentLavender: DetergentProfile = new DetergentProfile(
  'Lavender',
  '9 Elements',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);

export default NineElementsLaundryDetergentLavender;
