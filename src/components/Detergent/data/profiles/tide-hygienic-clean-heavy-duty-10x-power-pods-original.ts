import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.MEALAS,
  Ingredient.MEAC12_15AlkylEtherSulfate,
  Ingredient.PropyleneGlycol,
  Ingredient.Water,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.Glycerin,
  Ingredient.C10_16Pareth,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PEG136PolyvinylAlcohol,
  Ingredient.MEACitrate,
  Ingredient.PentasodiumPentetate,
  Ingredient.SodiumBisulfite,
  Ingredient.MethylDiTButylHydroxyhydrocinnamate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreViolet,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreCyan,
  Ingredient.PolyoxyalkyleneSubstitutedChromophoreYellow,
  Ingredient.Fragrance,
];

const TideHygienicCleanHeavyDuty10xPowerPodsOriginal: DetergentProfile = new DetergentProfile(
  'Hygienic Clean Heavy Duty 10X Power PODS Original',
  'Tide',
  DetergentType.Pod,
  ingredients,
  new Date('2026-02-26'),
);
TideHygienicCleanHeavyDuty10xPowerPodsOriginal.countryOfOrigin = 'USA';
TideHygienicCleanHeavyDuty10xPowerPodsOriginal.countriesAvailable = ['USA'];

export default TideHygienicCleanHeavyDuty10xPowerPodsOriginal;
