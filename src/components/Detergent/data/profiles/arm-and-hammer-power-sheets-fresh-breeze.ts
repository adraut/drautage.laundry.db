import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.SodiumLaurylSulfate,
  Ingredient.PolyvinylAlcohol,
  Ingredient.Water,
  Ingredient.C10_16Alketh,
  Ingredient.Fragrance,
  Ingredient.Glycerin,
  Ingredient.SodiumCitrate,
  Ingredient.PEG7GlycerylCocoate,
  Ingredient.PEG12Dimethicone,
  Ingredient.MethoxyPEG10Cocoate,
  Ingredient.Saponins,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumCarbonate,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
];

const ArmAndHammerPowerSheetsFreshBreeze: DetergentProfile = new DetergentProfile(
  'Power Sheets Fresh Breeze',
  'Arm & Hammer',
  DetergentType.Sheet,
  ingredients,
  new Date('2026-03-14'),
);
ArmAndHammerPowerSheetsFreshBreeze.countriesAvailable = ['USA'];

export default ArmAndHammerPowerSheetsFreshBreeze;
