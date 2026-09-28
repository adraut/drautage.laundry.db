import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

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
  Ingredient.Citral,
  Ingredient.CitrusAurantiumBergamiaFruitOil,
  Ingredient.CitrusAurantiumDulcisOrangePeelOil,
  Ingredient.CitrusGrandisPeelOil,
  Ingredient.LavandulAngustifoliaOil,
  Ingredient.Limonene,
];

const SeventhGenerationUltraPowerPlusLaundryDetergentPacksCleanScent: DetergentProfile = new DetergentProfile(
  'Ultra Power+ Laundry Detergent Packs Clean Scent',
  'Seventh Generation',
  ProductType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
SeventhGenerationUltraPowerPlusLaundryDetergentPacksCleanScent.countriesAvailable = ['USA'];
export default SeventhGenerationUltraPowerPlusLaundryDetergentPacksCleanScent;
