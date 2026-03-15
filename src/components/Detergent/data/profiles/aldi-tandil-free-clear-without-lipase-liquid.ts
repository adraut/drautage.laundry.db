import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water, // listed as 'Soft Water' on packaging
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumMEALinearAlkylbenzene,
  Ingredient.LaurylAlcoholEthoxylate,
  Ingredient.SodiumBorate,
  Ingredient.PropyleneGlycol,
  Ingredient.Dimethicone, // listed as 'Dimethicone Defoamer' on packaging
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.PectateLyase,
  Ingredient.Mannanase,
  Ingredient.Cellulase,
  Ingredient.FluorescentBrightener28,
  Ingredient.SodiumCitrate,
  Ingredient.CitricAcid,
  Ingredient.TetrasodiumEDTA,
  Ingredient.Methylisothiazolinone,
  Ingredient.Methylchloroisothiazolinone,
];

const AldiTandiFreeClearWithoutLipaseLiquid: DetergentProfile = new DetergentProfile(
  'Tandil Free Clear Without Lipase',
  'Aldi',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-15'),
);
AldiTandiFreeClearWithoutLipaseLiquid.countriesAvailable = ['USA'];
export default AldiTandiFreeClearWithoutLipaseLiquid;
