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
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.Glycerin,
  Ingredient.MEACitrate,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumBisulfite,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.Subtilisin,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
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

const TideOxiBoostPowerPods: DetergentProfile = new DetergentProfile(
  'OXI Boost Power PODS',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-22'),
);
TideOxiBoostPowerPods.countryOfOrigin = 'USA';
TideOxiBoostPowerPods.countriesAvailable = ['USA'];

export default TideOxiBoostPowerPods;
