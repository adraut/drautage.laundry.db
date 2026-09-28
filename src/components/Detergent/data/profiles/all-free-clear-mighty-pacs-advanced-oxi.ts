import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

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
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.Protease,
  Ingredient.DenatoniumBenzoate,
  Ingredient.Amylase,
  Ingredient.Mannanase,
];

const AllFreeClearMightyPacsAdvancedOxi: DetergentProfile = new DetergentProfile(
  'Free Clear Mighty Pacs Advanced OXI',
  'All',
  ProductType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-21'),
);
AllFreeClearMightyPacsAdvancedOxi.countryOfOrigin = 'USA';
AllFreeClearMightyPacsAdvancedOxi.countriesAvailable = ['USA'];

export default AllFreeClearMightyPacsAdvancedOxi;
