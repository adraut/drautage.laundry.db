import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.SodiumCitrate,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumOleate,
  Ingredient.SodiumSulfate,
  Ingredient.CitricAcid,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
  Ingredient.BarosmaBetulina,
  Ingredient.CarthamusTinctoriusSeedOil,
  Ingredient.CitrusAurantiumDulcisOrangePeelOil,
  Ingredient.GammaDecalactone,
  Ingredient.Linalool,
];

const SeventhGenerationBiobasedDeepCleanFreshCitrus: DetergentProfile = new DetergentProfile(
  'Biobased Deep Clean Fresh Citrus',
  'Seventh Generation',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);
SeventhGenerationBiobasedDeepCleanFreshCitrus.countriesAvailable = ['USA', 'CAN'];
export default SeventhGenerationBiobasedDeepCleanFreshCitrus;
