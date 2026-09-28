import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

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
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.DenatoniumBenzoate,
];

const AllFreeClearMightyPacsTheOriginal: DetergentProfile = new DetergentProfile(
  'Free Clear Mighty Pacs The Original',
  'All',
  ProductType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-14'),
);
AllFreeClearMightyPacsTheOriginal.countryOfOrigin = 'USA';
AllFreeClearMightyPacsTheOriginal.countriesAvailable = ['USA'];

export default AllFreeClearMightyPacsTheOriginal;
