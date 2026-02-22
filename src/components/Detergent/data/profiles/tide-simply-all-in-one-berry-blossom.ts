import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumBorate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.Fragrance,
  Ingredient.PropyleneGlycol,
  Ingredient.CalciumFormate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.FluorescentBrightener71,
  Ingredient.Ethanolamine,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const TideSimplyAllInOneBerryBlossom: DetergentProfile = new DetergentProfile(
  'Simply All-In-One Berry Blossom',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TideSimplyAllInOneBerryBlossom.countryOfOrigin = 'USA';
TideSimplyAllInOneBerryBlossom.countriesAvailable = ['USA'];

export default TideSimplyAllInOneBerryBlossom;
