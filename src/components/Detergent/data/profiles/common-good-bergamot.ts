import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.EthoxylatedAlcohol,
  Ingredient.SodiumDodecylbenzenesulfonate,
  Ingredient.SodiumCocoate,
  Ingredient.SodiumCitrate,
  Ingredient.LauramineOxide,
  Ingredient.Propanediol,
  Ingredient.EssentialOil, // listed as "essential oil (when used)" — conditional, present in scented variants
  Ingredient.Phenoxyethanol,
  Ingredient.EthylhexylGlycerin,
  Ingredient.Protease,
  Ingredient.Lipase,
  Ingredient.Mannanase,
  Ingredient.Amylase,
  Ingredient.PectateLyase,
  Ingredient.SodiumBicarbonate,
];

const CommonGoodBergamot: DetergentProfile = new DetergentProfile(
  'Bergamot',
  'Common Good',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);

export default CommonGoodBergamot;
