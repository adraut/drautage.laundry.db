import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.MEACitrate,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.PropyleneGlycol,
  Ingredient.Fragrance,
  Ingredient.Ethanol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.SodiumMetaborate,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Protease,
  Ingredient.Methylisothiazolinone,
  Ingredient.Amylase,
  Ingredient.Colorants,
  Ingredient.Methylchloroisothiazolinone,
  Ingredient.Mannanase,
  Ingredient.Cellulase,
];

const PersilIntenseFresh: DetergentProfile = new DetergentProfile(
  'Intense Fresh',
  'Persil',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
PersilIntenseFresh.countriesAvailable = ['USA'];

export default PersilIntenseFresh;
