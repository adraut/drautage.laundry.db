import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumAcrylicAcidMACopolymer,
  Ingredient.PropyleneGlycol,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Simethicone,
  Ingredient.Silica,
  Ingredient.PEG,
  Ingredient.Zeolite,
  Ingredient.SodiumChloride,
  Ingredient.CelluloseGum,
  Ingredient.SodiumCitrate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.SodiumHydroxide,
  Ingredient.SodiumCarbonate,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.Fragrance,
];

const TideEvoOriginalScent: DetergentProfile = new DetergentProfile(
  'evo Original Scent',
  'Tide',
  DetergentType.Tile,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);

export default TideEvoOriginalScent;
