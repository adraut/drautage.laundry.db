import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_7,
  Ingredient.LaurylGlucoside,
  Ingredient.SodiumChloride,
  Ingredient.SodiumCitrate,
  Ingredient.Glycerin,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.CocamidopropylBetaine,
  Ingredient.CitricAcid,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.PectateLyase,
  Ingredient.Mannanase,
  Ingredient.Lipase,
  Ingredient.Cellulase,
  Ingredient.Benzisothiazolinone,
];

const GingerLilyFarmsBotanicalsPlantBasedLaundryDetergentFreeAndClear: DetergentProfile = new DetergentProfile(
  'Plant-Based Laundry Detergent Free & Clear',
  'Ginger Lily Farms Botanicals',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
GingerLilyFarmsBotanicalsPlantBasedLaundryDetergentFreeAndClear.countriesAvailable = ['USA'];
export default GingerLilyFarmsBotanicalsPlantBasedLaundryDetergentFreeAndClear;
