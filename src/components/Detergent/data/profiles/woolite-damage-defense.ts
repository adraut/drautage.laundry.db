import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumChloride,
  Ingredient.C10_16Pareth,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.LauramineOxide,
  Ingredient.WheatProteinSilanetriol,
  Ingredient.Triethanolamine,
  Ingredient.SodiumHydroxide,
  Ingredient.PEGTerephthalatePolymer,
  Ingredient.BHT,
  Ingredient.Benzisothiazolinone,
  Ingredient.Methylisothiazolinone,
  Ingredient.Fragrance,
];

const WooliteDamageDefense: DetergentProfile = new DetergentProfile(
  'Damage Defense',
  'Woolite',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
WooliteDamageDefense.countriesAvailable = ['USA'];

export default WooliteDamageDefense;
