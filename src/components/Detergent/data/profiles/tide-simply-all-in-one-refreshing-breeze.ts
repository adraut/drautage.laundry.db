import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEALaurethSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumBorate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumMEACitrate,
  Ingredient.Alcohol,
  Ingredient.SodiumMEALaurylSulfate,
  Ingredient.PentasodiumPentetate,
  Ingredient.SodiumFormate,
  Ingredient.CalciumFormate,
  Ingredient.FluorescentBrightener71,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.Fragrance,
];

const TideSimplyAllInOneRefreshingBreeze: DetergentProfile = new DetergentProfile(
  'Simply All-In-One Refreshing Breeze',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideSimplyAllInOneRefreshingBreeze.countryOfOrigin = 'USA';
TideSimplyAllInOneRefreshingBreeze.countriesAvailable = ['USA'];

export default TideSimplyAllInOneRefreshingBreeze;
