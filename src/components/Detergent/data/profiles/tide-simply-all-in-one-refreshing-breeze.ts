import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  Ingredient.Ethanol,
  Ingredient.PropyleneGlycol,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TideSimplyAllInOneRefreshingBreeze: DetergentProfile = new DetergentProfile(
  'Simply All-In-One Refreshing Breeze',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
TideSimplyAllInOneRefreshingBreeze.countryOfOrigin = 'USA';
TideSimplyAllInOneRefreshingBreeze.countriesAvailable = ['USA'];

export default TideSimplyAllInOneRefreshingBreeze;
