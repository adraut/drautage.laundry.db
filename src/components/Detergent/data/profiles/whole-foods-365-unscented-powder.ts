import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumCarbonatePeroxide,
  Ingredient.Laureth_7,
  Ingredient.SodiumMetasilicate,
  Ingredient.CalciumCarbonate,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Pectinase,
  Ingredient.Lipase,
];

const WholeFoods365UnscentedPowder: DetergentProfile = new DetergentProfile(
  '365 Unscented Powder',
  'Whole Foods',
  DetergentType.Powder,
  ingredients,
  new Date('2026-01-31'),
);
WholeFoods365UnscentedPowder.countryOfOrigin = 'USA';
WholeFoods365UnscentedPowder.countriesAvailable = ['USA'];
export default WholeFoods365UnscentedPowder;
