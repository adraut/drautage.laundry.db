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
  Ingredient.StyreneAcrylatesCopolymer,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const GainSuperFlingsHibiscusHula: DetergentProfile = new DetergentProfile(
  'Super Flings Hibiscus Hula',
  'Gain',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
GainSuperFlingsHibiscusHula.countryOfOrigin = 'USA';
GainSuperFlingsHibiscusHula.countriesAvailable = ['USA'];

export default GainSuperFlingsHibiscusHula;
