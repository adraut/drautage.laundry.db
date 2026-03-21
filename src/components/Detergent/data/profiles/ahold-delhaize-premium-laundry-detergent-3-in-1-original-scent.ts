import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.Glycerin,
  Ingredient.LinearAlkylbenzeneSulfonicAcid,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.PropyleneGlycol,
  Ingredient.Water,
  Ingredient.CoconutFattyAcid,
  Ingredient.Ethanolamine,
  Ingredient.PolyethyleniminePolymer,
  Ingredient.Fragrance,
  Ingredient.Opacifier,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.PectateLyase,
  Ingredient.Cellulase,
  Ingredient.Lipase,
  Ingredient.Colorants,
];

const AholdDelhaizePremiumLaundryDetergent3In1OriginalScent: DetergentProfile = new DetergentProfile(
  'Premium Laundry Detergent 3-in-1 Original Scent',
  'Ahold Delhaize',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
AholdDelhaizePremiumLaundryDetergent3In1OriginalScent.countriesAvailable = ['USA'];

export default AholdDelhaizePremiumLaundryDetergent3In1OriginalScent;
