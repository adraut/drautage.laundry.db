import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Ethanolamine,
  Ingredient.PropyleneGlycol,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TideSimplyOxiBoostUltraStainReleaseRefreshingBreeze: DetergentProfile = new DetergentProfile(
  'Simply OXI Boost + Ultra Stain Release Refreshing Breeze',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
TideSimplyOxiBoostUltraStainReleaseRefreshingBreeze.countryOfOrigin = 'USA';
TideSimplyOxiBoostUltraStainReleaseRefreshingBreeze.countriesAvailable = ['USA'];

export default TideSimplyOxiBoostUltraStainReleaseRefreshingBreeze;
