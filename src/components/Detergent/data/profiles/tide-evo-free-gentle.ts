import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.Silica,
  Ingredient.SodiumCarbonate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.C10_16Alketh,
  Ingredient.C12_14AlcoholsEthoxylated,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.SodiumAcrylicAcidMACopolymer,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumCitrate,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.PEG,
  Ingredient.PropyleneGlycol,
  Ingredient.Zeolite,
  Ingredient.Subtilisin,
  Ingredient.SodiumHydroxide,
  Ingredient.Simethicone,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Amylase,
];

const TideEvoFreeGentle: DetergentProfile = new DetergentProfile(
  'evo Free & Gentle',
  'Tide',
  DetergentType.Tile,
  ingredients,
  new Date('2026-02-21'),
);
TideEvoFreeGentle.countryOfOrigin = 'USA';
TideEvoFreeGentle.countriesAvailable = ['USA'];

export default TideEvoFreeGentle;
