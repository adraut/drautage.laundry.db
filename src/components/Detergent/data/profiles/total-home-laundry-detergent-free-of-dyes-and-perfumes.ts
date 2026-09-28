import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumChloride,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.DodecylbenzeneSulfonicAcid,
  Ingredient.SodiumHydroxide,
  Ingredient.TrisNHydroxyethylHexahydrotriazine,
  Ingredient.Cyclotetrasiloxane,
];

const TotalHomeLaundryDetergentFreeOfDyesAndPerfumes: DetergentProfile = new DetergentProfile(
  'Free of Dyes & Perfumes',
  'Total Home',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-27'),
);
TotalHomeLaundryDetergentFreeOfDyesAndPerfumes.countryOfOrigin = 'USA';
TotalHomeLaundryDetergentFreeOfDyesAndPerfumes.countriesAvailable = ['USA'];

export default TotalHomeLaundryDetergentFreeOfDyesAndPerfumes;
