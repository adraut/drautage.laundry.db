import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.OrganicSoapberryJuice,
  Ingredient.LoniceraJaponicaFlowerExtract,
  Ingredient.PotassiumCocoate,
  Ingredient.XanthanGum,
  Ingredient.SodiumChloride,
  Ingredient.Glycerin,
  Ingredient.LavandulaHybridaOil,
  Ingredient.AloeBarbadenisLeafPowder,
  Ingredient.SodiumBicarbonate,
  Ingredient.GumAcacia,
  Ingredient.GuarGum,
];

const SimpleTruthOrganicSweetLavenderLaundryDetergent: DetergentProfile = new DetergentProfile(
  'Organic Sweet Lavender Laundry Detergent',
  'Simple Truth',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
SimpleTruthOrganicSweetLavenderLaundryDetergent.countriesAvailable = ['USA'];
export default SimpleTruthOrganicSweetLavenderLaundryDetergent;
