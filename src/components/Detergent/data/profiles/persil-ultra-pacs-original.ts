import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.MEALAS,
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.PropyleneGlycol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.PEG_10,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.Fragrance,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.Protease,
  Ingredient.DenatoniumBenzoate,
  Ingredient.Colorants,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
];

const PersilUltraPacsOriginal: DetergentProfile = new DetergentProfile(
  'Ultra Pacs Original',
  'Persil',
  DetergentType.Pod,
  ingredients,
  new Date('2026-03-15'),
);
PersilUltraPacsOriginal.countriesAvailable = ['USA', 'CAN'];

export default PersilUltraPacsOriginal;
