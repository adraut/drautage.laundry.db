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
  Ingredient.SodiumMEACitrate,
  Ingredient.SodiumFormate,
  Ingredient.Fragrance,
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
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
];

const GainRelaxDewdropDream: DetergentProfile = new DetergentProfile(
  'Relax Dewdrop Dream',
  'Gain',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-22'),
);
GainRelaxDewdropDream.countryOfOrigin = 'USA';
GainRelaxDewdropDream.countriesAvailable = ['USA'];

export default GainRelaxDewdropDream;
