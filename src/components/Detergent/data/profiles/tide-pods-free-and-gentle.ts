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
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumBisulfite,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.Subtilisin,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Amylase,
  Ingredient.Zeolite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePodsFreeAndGentle: DetergentProfile = new DetergentProfile(
  'PODS Free and Gentle',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TidePodsFreeAndGentle.countryOfOrigin = 'USA';
TidePodsFreeAndGentle.countriesAvailable = ['USA'];

export default TidePodsFreeAndGentle;
