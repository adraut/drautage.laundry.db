import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.DecylGlucoside,
  Ingredient.LaurylGlucoside,
  Ingredient.Propanediol,
  Ingredient.Glycerin,
  // Deodorizing Agent: generic term, no CAS number — omitted (unknown ingredient)
  Ingredient.SodiumBenzoate,
  Ingredient.SodiumGluconate,
  Ingredient.Phenylpropanol,
  Ingredient.LauricAcid,
  Ingredient.CitricAcid,
  Ingredient.CaprylylGlycol,
  Ingredient.PotassiumSorbate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.SodiumHydroxide,
  Ingredient.Amylase,
  Ingredient.Pectinase,
  Ingredient.Mannanase,
  Ingredient.Cellulase,
  Ingredient.Protease,
  Ingredient.Lipase,
  Ingredient.CelluloseGum, // listed as Sodium Carboxymethylcellulose (confirmed INCI synonym)
  Ingredient.SodiumBicarbonate,
];

const WishingWellSundayReset: DetergentProfile = new DetergentProfile(
  'Sunday Reset',
  'Wishing Well',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);

export default WishingWellSundayReset;
