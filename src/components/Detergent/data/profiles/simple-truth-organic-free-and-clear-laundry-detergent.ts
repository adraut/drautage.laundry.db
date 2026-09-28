import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.OrganicSoapberryJuice,
  Ingredient.LoniceraJaponicaFlowerExtract,
  Ingredient.PotassiumCocoate,
  Ingredient.XanthanGum,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumChloride,
  Ingredient.Glycerin,
  Ingredient.AloeBarbadenisLeafPowder,
  Ingredient.SodiumBicarbonate,
  Ingredient.GumAcacia,
  Ingredient.GuarGum,
];

const SimpleTruthOrganicFreeAndClearLaundryDetergent: DetergentProfile = new DetergentProfile(
  'Organic Free & Clear Laundry Detergent',
  'Simple Truth',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
SimpleTruthOrganicFreeAndClearLaundryDetergent.countriesAvailable = ['USA'];
export default SimpleTruthOrganicFreeAndClearLaundryDetergent;
