import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_6,
  Ingredient.PropyleneGlycol,
  Ingredient.CaprylylCaprylGlucoside,
  Ingredient.Glycerin,
  Ingredient.SodiumOleate,
  Ingredient.SodiumChloride,
  Ingredient.CitricAcid,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Mannanase,
  Ingredient.CitrusAurantiumDulcisOrangePeelOil,
  Ingredient.LavandulAngustifoliaOil,
  Ingredient.LavandulaHybridaLavandinOil,
  Ingredient.Linalool,
  Ingredient.MenthaViridisLeafOil,
  Ingredient.PelargoniumGraveolensFlowerOil,
  Ingredient.PogostemonCablinOil,
];

const SeventhGenerationEasyDoseBiobasedDeepCleanFreshLavender: DetergentProfile = new DetergentProfile(
  'EasyDose Biobased Deep Clean',
  'Seventh Generation',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);
SeventhGenerationEasyDoseBiobasedDeepCleanFreshLavender.countriesAvailable = ['USA'];
export default SeventhGenerationEasyDoseBiobasedDeepCleanFreshLavender;
