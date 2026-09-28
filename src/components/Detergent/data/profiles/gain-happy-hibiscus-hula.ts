import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Fragrance,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumFormate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Alcohol,
  Ingredient.Ethanolamine,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Colorants,
];

const GainHappyHibiscusHula: DetergentProfile = new DetergentProfile(
  'Happy Hibiscus Hula',
  'Gain',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
GainHappyHibiscusHula.countryOfOrigin = 'USA';
GainHappyHibiscusHula.countriesAvailable = ['USA'];

export default GainHappyHibiscusHula;
