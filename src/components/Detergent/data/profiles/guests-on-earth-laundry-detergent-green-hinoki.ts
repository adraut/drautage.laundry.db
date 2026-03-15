import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Glycolipids,
  Ingredient.LaurylGlucoside,
  Ingredient.Water,
  Ingredient.Glycerin,
  Ingredient.SodiumMethyl2Sulphooctadecanoate,
  Ingredient.SodiumCocoamphopropionate,
  Ingredient.Fragrance,
  Ingredient.SodiumGluconate,
  Ingredient.SodiumCitrate,
  Ingredient.Polysaccharides,
  Ingredient.SodiumPolyitaconate,
  Ingredient.MagnesiumChloride,
  Ingredient.Cellulase,
  Ingredient.AlphaCellulase,
  Ingredient.Protease,
  Ingredient.AlphaAmylase,
  Ingredient.Mannanase,
  Ingredient.Lipase,
  Ingredient.SaccharomycesFermentFiltrate,
];

const GuestsOnEarthLaundryDetergentGreenHinoki: DetergentProfile = new DetergentProfile(
  'Green Hinoki',
  'Guests on Earth',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-15'),
);

export default GuestsOnEarthLaundryDetergentGreenHinoki;
