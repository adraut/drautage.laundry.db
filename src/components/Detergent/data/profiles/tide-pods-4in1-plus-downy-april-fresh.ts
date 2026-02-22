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
  Ingredient.Fragrance,
  Ingredient.MEACitrate,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PPG,
  Ingredient.Polyquaternium10,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Subtilisin,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePods4in1PlusDownyAprilFresh: DetergentProfile = new DetergentProfile(
  'PODS 4in1 Plus Downy April Fresh',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePods4in1PlusDownyAprilFresh.countryOfOrigin = 'USA';
TidePods4in1PlusDownyAprilFresh.countriesAvailable = ['USA'];

export default TidePods4in1PlusDownyAprilFresh;
