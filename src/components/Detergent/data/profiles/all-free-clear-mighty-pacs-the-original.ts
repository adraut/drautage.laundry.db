import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.MEALAS,
  Ingredient.Glycerin,
  Ingredient.Water,
  Ingredient.PropyleneGlycol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PEG_10,
  Ingredient.PolyvinylAlcoholPolymer,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.DenatoniumBenzoate,
];

const AllFreeClearMightyPacsTheOriginal: DetergentProfile = new DetergentProfile(
  'Free Clear Mighty Pacs The Original',
  'All',
  DetergentType.Pod,
  ingredients,
  new Date('2026-03-14'),
);
AllFreeClearMightyPacsTheOriginal.countryOfOrigin = 'USA';
AllFreeClearMightyPacsTheOriginal.countriesAvailable = ['USA'];

export default AllFreeClearMightyPacsTheOriginal;
