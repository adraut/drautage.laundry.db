import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  'Laundry Detergent',
  'Total Home',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-27'),
);
TotalHomeLaundryDetergentFreeOfDyesAndPerfumes.countryOfOrigin = 'USA';
TotalHomeLaundryDetergentFreeOfDyesAndPerfumes.countriesAvailable = ['USA'];

export default TotalHomeLaundryDetergentFreeOfDyesAndPerfumes;
