import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.PropyleneGlycol,
  Ingredient.MEALaurethSulfate,
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.C10_16Pareth,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.Fragrance,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.MEACitrate,
  Ingredient.Subtilisin,
  Ingredient.SodiumBisulfite,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Amylase,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.Zeolite,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePowerPodsFebrezeOdorEliminatorsSpringRenewal: DetergentProfile = new DetergentProfile(
  'Power PODS Febreze Odor Eliminators + Lasting Freshness Spring & Renewal',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePowerPodsFebrezeOdorEliminatorsSpringRenewal.countryOfOrigin = 'USA';
TidePowerPodsFebrezeOdorEliminatorsSpringRenewal.countriesAvailable = ['USA'];

export default TidePowerPodsFebrezeOdorEliminatorsSpringRenewal;
