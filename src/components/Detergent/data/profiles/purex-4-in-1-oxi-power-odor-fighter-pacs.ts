import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.MEALAS,
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.PropyleneGlycol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PEG_10,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.DenatoniumBenzoate,
  Ingredient.Colorants,
];

const PurexFourInOneOxiPowerOdorFighterPacs: DetergentProfile = new DetergentProfile(
  '4-in-1 OXI Power + Odor Fighter Pacs',
  'Purex',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
PurexFourInOneOxiPowerOdorFighterPacs.countriesAvailable = ['USA'];
export default PurexFourInOneOxiPowerOdorFighterPacs;
