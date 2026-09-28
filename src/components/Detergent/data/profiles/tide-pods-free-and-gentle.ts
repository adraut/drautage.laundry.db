import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.MEALaurethSulfate,
  Ingredient.C10_16Alketh,
  Ingredient.PropyleneGlycol,
  Ingredient.Glycerin,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PEGTerephthalatePolymer, // may contain
  Ingredient.MEACitrate,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Zeolite, // may contain
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
];

const TidePodsFreeAndGentle: DetergentProfile = new DetergentProfile(
  'PODS Free & Gentle',
  'Tide',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
TidePodsFreeAndGentle.countryOfOrigin = 'USA';
TidePodsFreeAndGentle.countriesAvailable = ['USA'];

export default TidePodsFreeAndGentle;
