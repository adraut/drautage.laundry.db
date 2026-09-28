import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { ProductType } from '../../../common/product/types/ProductType';
import { DataSource } from '../../../common/product/types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumCitrate,
  Ingredient.Glycerin,
  Ingredient.SodiumOleate,
  Ingredient.Fragrance,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Protease,
  Ingredient.Pectinase,
  Ingredient.Cellulase,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.CitricAcid,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
];

const TheLaundressDreamSleepwearDetergentRichTranquil: DetergentProfile = new DetergentProfile(
  'Dream Sleepwear Detergent (Rich & Tranquil Scent)',
  'The Laundress',
  ProductType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-09-27'),
);
TheLaundressDreamSleepwearDetergentRichTranquil.countriesAvailable = ['USA'];
export default TheLaundressDreamSleepwearDetergentRichTranquil;
