import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

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
  Ingredient.MEACitrate,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Cellulase,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const TidePodsSpringMeadow: DetergentProfile = new DetergentProfile(
  'PODS 3-in-1 Spring Meadow',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-21'),
);
TidePodsSpringMeadow.countryOfOrigin = 'USA';
TidePodsSpringMeadow.countriesAvailable = ['USA'];

export default TidePodsSpringMeadow;
