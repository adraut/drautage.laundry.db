import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.CalciumFormate,
  Ingredient.C12_18FattyAcidsSodiumSalt,
  Ingredient.SodiumCitrate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PEGPropyleneGlycolTerephthalicAcidPolymer,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Fragrance,
];

const TideFreshGentleCoastalOasis: DetergentProfile = new DetergentProfile(
  'Fresh & Gentle Coastal Oasis',
  'Tide',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-10-18'),
);
TideFreshGentleCoastalOasis.countryOfOrigin = 'USA';
TideFreshGentleCoastalOasis.countriesAvailable = ['USA'];

export default TideFreshGentleCoastalOasis;
