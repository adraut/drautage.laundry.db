import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumOleate,
  Ingredient.SodiumBicarbonate,
  Ingredient.SodiumGluconate,
  Ingredient.Amylase,
  Ingredient.Cellulase,
  Ingredient.Lipase,
  Ingredient.Mannanase,
  Ingredient.Pectinase,
  Ingredient.Protease,
  Ingredient.CitricAcid,
  Ingredient.SodiumChloride,
  Ingredient.Methylisothiazolinone,
  Ingredient.Benzisothiazolinone,
];

const EverSpringFreeAndClear: DetergentProfile = new DetergentProfile(
  'Free & Clear Laundry Detergent',
  'Everspring',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
EverSpringFreeAndClear.countriesAvailable = ['USA'];
export default EverSpringFreeAndClear;
