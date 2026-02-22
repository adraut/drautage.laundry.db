import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.PropyleneGlycol,
  Ingredient.C10_16Pareth,
  Ingredient.Water,
  Ingredient.MEALaurethSulfate,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.Glycerin,
  Ingredient.MEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumBisulfite,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Subtilisin,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePodsFreeAndGentleOdorRefresh: DetergentProfile = new DetergentProfile(
  'PODS Free and Gentle Odor Refresh',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePodsFreeAndGentleOdorRefresh.countryOfOrigin = 'USA';
TidePodsFreeAndGentleOdorRefresh.countriesAvailable = ['USA'];

export default TidePodsFreeAndGentleOdorRefresh;
