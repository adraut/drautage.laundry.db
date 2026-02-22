import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.PropyleneGlycol,
  Ingredient.MEALaurethSulfate,
  Ingredient.Water,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.Glycerin,
  Ingredient.C10_16Pareth,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.Fragrance,
  Ingredient.MEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumBisulfite,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Subtilisin,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePowerPodsFebrezeSportOdorDefense: DetergentProfile = new DetergentProfile(
  'Power PODS Febreze Odor Eliminators + Sport Odor Defense',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePowerPodsFebrezeSportOdorDefense.countryOfOrigin = 'USA';
TidePowerPodsFebrezeSportOdorDefense.countriesAvailable = ['USA'];

export default TidePowerPodsFebrezeSportOdorDefense;
