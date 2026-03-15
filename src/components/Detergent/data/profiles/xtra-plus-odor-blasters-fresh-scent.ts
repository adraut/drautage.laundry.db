import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumCarbonate,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.C12_13AlcoholsEthoxylated,
  Ingredient.C10_16Alketh,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.AcrylicAcidHomopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumChloride,
  Ingredient.SodiumHydroxide,
  Ingredient.PentasodiumPentetate,
  Ingredient.Colorants,
  Ingredient.Fragrance,
];

const XtraPlusOdorBlastersFreshScent: DetergentProfile = new DetergentProfile(
  'Plus Odor Blasters',
  'Xtra',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-14'),
);
XtraPlusOdorBlastersFreshScent.countryOfOrigin = 'USA';
XtraPlusOdorBlastersFreshScent.countriesAvailable = ['USA'];

export default XtraPlusOdorBlastersFreshScent;
