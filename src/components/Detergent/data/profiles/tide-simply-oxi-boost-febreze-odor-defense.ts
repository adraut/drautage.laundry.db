import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.Ethanolamine,
  Ingredient.PropyleneGlycol,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TideSimplyOxiBoostFebrezeOdorDefense: DetergentProfile = new DetergentProfile(
  'Simply OXI Boost + Febreze Odor Defense',
  'Tide',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
TideSimplyOxiBoostFebrezeOdorDefense.countryOfOrigin = 'USA';
TideSimplyOxiBoostFebrezeOdorDefense.countriesAvailable = ['USA'];

export default TideSimplyOxiBoostFebrezeOdorDefense;
