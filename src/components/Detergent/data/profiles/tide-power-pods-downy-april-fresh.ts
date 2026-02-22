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
  Ingredient.Glycerin,
  Ingredient.MEACitrate,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PPG,
  Ingredient.Polyquaternium10,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Subtilisin,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Mannanase,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePowerPodsDownyAprilFresh: DetergentProfile = new DetergentProfile(
  'Power PODS with Downy Soft Booster April Fresh',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePowerPodsDownyAprilFresh.countryOfOrigin = 'USA';
TidePowerPodsDownyAprilFresh.countriesAvailable = ['USA'];

export default TidePowerPodsDownyAprilFresh;
