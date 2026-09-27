import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.C10_16Pareth,
  Ingredient.MEALaurethSulfate,
  Ingredient.PropyleneGlycol,
  Ingredient.Glycerin,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.MEACitrate,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Zeolite,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TidePowerPodsOdorOxiDefense: DetergentProfile = new DetergentProfile(
  'Power PODS Odor + OXI Defense',
  'Tide',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
TidePowerPodsOdorOxiDefense.countryOfOrigin = 'USA';
TidePowerPodsOdorOxiDefense.countriesAvailable = ['USA'];

export default TidePowerPodsOdorOxiDefense;
