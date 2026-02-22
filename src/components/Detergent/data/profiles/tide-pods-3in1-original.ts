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
  Ingredient.SodiumBisulfite,
  Ingredient.Subtilisin,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreBlue,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Mannanase,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePods3in1Original: DetergentProfile = new DetergentProfile(
  'PODS 3-in-1 Original',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-21'),
);
TidePods3in1Original.countryOfOrigin = 'USA';
TidePods3in1Original.countriesAvailable = ['USA'];

export default TidePods3in1Original;
