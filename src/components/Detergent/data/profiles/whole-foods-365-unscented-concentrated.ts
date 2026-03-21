import { Ingredient } from '../../../common/types/Ingredient';
import { DataSource } from '../../types/DataSource';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumChloride,
  Ingredient.Protease,
  Ingredient.LaurylGlucoside,
  Ingredient.SodiumBicarbonate,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Lipase,
  Ingredient.Pectinase,
  Ingredient.Mannanase,
  Ingredient.CitricAcid,
  Ingredient.Benzisothiazolinone,
];

const WholeFoods365UnscentedConcentrated: DetergentProfile = new DetergentProfile(
  '365 Unscented Concentrated',
  'Whole Foods',
  DetergentType.Liquid,
  DataSource.SDS,
  ingredients,
  new Date('2026-01-31'),
);
WholeFoods365UnscentedConcentrated.countryOfOrigin = 'USA';
WholeFoods365UnscentedConcentrated.countriesAvailable = ['USA'];
export default WholeFoods365UnscentedConcentrated;
