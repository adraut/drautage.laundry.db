import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumCitrate,
  Ingredient.Alcohol,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Subtilisin,
  Ingredient.CalciumFormate,
  Ingredient.Amylase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
];

const TidePurcleanHoneyLavender: DetergentProfile = new DetergentProfile(
  'Purclean Honey Lavender',
  'Tide',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
TidePurcleanHoneyLavender.countryOfOrigin = 'USA';
TidePurcleanHoneyLavender.countriesAvailable = ['USA'];

export default TidePurcleanHoneyLavender;
