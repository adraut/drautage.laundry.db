import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumMEACitrate,
  Ingredient.Fragrance,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Alcohol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.Ethanolamine,
  Ingredient.SodiumFormate,
  Ingredient.Diethylenetriamine,
  Ingredient.MethylDiTButylHydroxycinnimate,
  Ingredient.Colorants,
];

const GainUltraOxiWaterfallDelight: DetergentProfile = new DetergentProfile(
  'Ultra + Oxi Waterfall Delight',
  'Gain',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
GainUltraOxiWaterfallDelight.countryOfOrigin = 'USA';
GainUltraOxiWaterfallDelight.countriesAvailable = ['USA'];

export default GainUltraOxiWaterfallDelight;
