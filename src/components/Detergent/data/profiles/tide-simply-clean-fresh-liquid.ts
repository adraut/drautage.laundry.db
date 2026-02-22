import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEALaurethSulfate,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumBorate,
  Ingredient.Alcohol,
  Ingredient.PentasodiumPentetate,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.C10_16Pareth,
  Ingredient.CalciumFormate,
  Ingredient.Ethanolamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const TideSimplyCleanFreshLiquid: DetergentProfile = new DetergentProfile(
  'Simply Clean & Fresh Refreshing Breeze',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideSimplyCleanFreshLiquid.countryOfOrigin = 'USA';
TideSimplyCleanFreshLiquid.countriesAvailable = ['USA'];

export default TideSimplyCleanFreshLiquid;
