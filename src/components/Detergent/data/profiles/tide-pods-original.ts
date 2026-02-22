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
  Ingredient.MEACitrate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.Fragrance,
  Ingredient.SodiumBisulfite,
  Ingredient.Subtilisin,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Amylase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.Mannanase,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePodsOriginal: DetergentProfile = new DetergentProfile(
  'PODS Original',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePodsOriginal.countryOfOrigin = 'USA';
TidePodsOriginal.countriesAvailable = ['USA'];

export default TidePodsOriginal;
