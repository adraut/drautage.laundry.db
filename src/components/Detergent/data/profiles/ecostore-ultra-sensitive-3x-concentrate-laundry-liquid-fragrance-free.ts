import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.LaurylGlucoside,
  Ingredient.CalciumChloride,
  Ingredient.CaprylylGlycol,
  Ingredient.CaprylylCaprylGlucoside,
  Ingredient.Amylase,
  Ingredient.CitricAcid,
  Ingredient.Phenoxyethanol,
  Ingredient.Subtilisin,
  Ingredient.Mannanase,
  Ingredient.Propanediol,
  Ingredient.PotassiumCarbonate,
  Ingredient.LacticAcid,
  Ingredient.SodiumMaleateAcrylateCopolymer,
  Ingredient.Lipase,
  Ingredient.PectateLyase,
];

const EcostoreUltraSensitive3xConcentrateLaundryLiquidFragranceFree: DetergentProfile = new DetergentProfile(
  'Ultra Sensitive 3X Concentrate Laundry Liquid',
  'ecostore',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
EcostoreUltraSensitive3xConcentrateLaundryLiquidFragranceFree.countriesAvailable = ['NZL'];

export default EcostoreUltraSensitive3xConcentrateLaundryLiquidFragranceFree;
