import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

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
  Ingredient.Fragrance,
];

const EverSpringLavenderBergamot: DetergentProfile = new DetergentProfile(
  'Lavender & Bergamot Laundry Detergent',
  'Ever Spring',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);
EverSpringLavenderBergamot.countriesAvailable = ['USA'];
export default EverSpringLavenderBergamot;
