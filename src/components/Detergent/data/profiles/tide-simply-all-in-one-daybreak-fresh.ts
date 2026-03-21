import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.Fragrance,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumFormate,
  Ingredient.CalciumFormate,
  Ingredient.Ethanolamine,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
];

const TideSimplyAllInOneDaybreakFresh: DetergentProfile = new DetergentProfile(
  'Simply All-In-One Daybreak Fresh',
  'Tide',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
TideSimplyAllInOneDaybreakFresh.countryOfOrigin = 'USA';
TideSimplyAllInOneDaybreakFresh.countriesAvailable = ['USA'];

export default TideSimplyAllInOneDaybreakFresh;
