import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.MEALAS,
  Ingredient.Glycerin,
  Ingredient.Water,
  Ingredient.PropyleneGlycol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PEG_10,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.Fragrance,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.DenatoniumBenzoate,
];

const AllSensitiveFreshMightyPacsSpringBreeze: DetergentProfile = new DetergentProfile(
  'Sensitive Fresh Mighty Pacs Spring Breeze',
  'All',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
AllSensitiveFreshMightyPacsSpringBreeze.countryOfOrigin = 'USA';
AllSensitiveFreshMightyPacsSpringBreeze.countriesAvailable = ['USA'];

export default AllSensitiveFreshMightyPacsSpringBreeze;
