import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumMEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumBorate,
  Ingredient.Fragrance,
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumFormate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Alcohol,
  Ingredient.Ethanolamine,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCumenesulfonate,
  Ingredient.C10_16AlkyldimethylamineOxide,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.Subtilisin,
  Ingredient.Benzisothiazolinone,
  Ingredient.AlkoxylatedAmineSubstitutedTriarylMethane,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const GainHappyHibiscusHula: DetergentProfile = new DetergentProfile(
  'Happy Hibiscus Hula',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainHappyHibiscusHula.countryOfOrigin = 'USA';
GainHappyHibiscusHula.countriesAvailable = ['USA'];

export default GainHappyHibiscusHula;
