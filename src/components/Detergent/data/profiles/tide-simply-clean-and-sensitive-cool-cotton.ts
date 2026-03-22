import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.Ethanolamine,
  Ingredient.PropyleneGlycol,
  Ingredient.Benzisothiazolinone,
  Ingredient.Fragrance,
];

const TideSimplyCleanAndSensitiveCoolCotton: DetergentProfile = new DetergentProfile(
  'Simply Clean & Sensitive Cool Cotton',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
TideSimplyCleanAndSensitiveCoolCotton.countryOfOrigin = 'USA';
TideSimplyCleanAndSensitiveCoolCotton.countriesAvailable = ['USA'];

export default TideSimplyCleanAndSensitiveCoolCotton;
