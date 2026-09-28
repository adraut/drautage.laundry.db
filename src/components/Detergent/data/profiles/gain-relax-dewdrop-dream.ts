import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.SodiumMEACitrate,
  Ingredient.Fragrance,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Ethanolamine,
  Ingredient.Alcohol,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
];

const GainRelaxDewdropDream: DetergentProfile = new DetergentProfile(
  'Relax Dewdrop Dream',
  'Gain',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
GainRelaxDewdropDream.countryOfOrigin = 'USA';
GainRelaxDewdropDream.countriesAvailable = ['USA'];

export default GainRelaxDewdropDream;
