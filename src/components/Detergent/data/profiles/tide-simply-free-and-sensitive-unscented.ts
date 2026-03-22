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
  Ingredient.CalciumFormate,
  Ingredient.SodiumFormate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Alcohol,
  Ingredient.PropyleneGlycol,
  Ingredient.Benzisothiazolinone,
];

const TideSimplyFreeAndSensitiveUnscented: DetergentProfile = new DetergentProfile(
  'Simply Free & Sensitive Unscented',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
TideSimplyFreeAndSensitiveUnscented.countryOfOrigin = 'USA';
TideSimplyFreeAndSensitiveUnscented.countriesAvailable = ['USA'];

export default TideSimplyFreeAndSensitiveUnscented;
