import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

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
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
SimpleTruthOrganicFreeAndClearLaundryDetergent.countriesAvailable = ['USA'];
export default SimpleTruthOrganicFreeAndClearLaundryDetergent;
