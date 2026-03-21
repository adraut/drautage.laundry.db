import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumCitrate,
  Ingredient.Laureth_6,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumSulfate,
  Ingredient.PolyvinylAlcohol,
  Ingredient.HydratedSilica,
  Ingredient.CocosNuciferaOil,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Cellulase,
];

const SeventhGenerationSensitiveSkinLaundryDetergentPacksFreeAndClear: DetergentProfile = new DetergentProfile(
  'Sensitive Skin Laundry Detergent Packs Free & Clear',
  'Seventh Generation',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
SeventhGenerationSensitiveSkinLaundryDetergentPacksFreeAndClear.countriesAvailable = ['USA'];
export default SeventhGenerationSensitiveSkinLaundryDetergentPacksFreeAndClear;
