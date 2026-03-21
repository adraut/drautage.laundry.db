import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.C12_15AlcoholsEthoxylated,
  Ingredient.MEALAS,
  Ingredient.Glycerin,
  Ingredient.PropyleneGlycol,
  Ingredient.C8_18FattyAcidAmideMEA,
  Ingredient.PolyvinylAlcoholFilm,
  Ingredient.PEG_10,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.Ethanol,
  Ingredient.Fragrance,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.TetrasodiumIminodisuccinate,
  Ingredient.HydrophobicallyModifiedAcrylateStyreneCopolymer,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.Protease,
  Ingredient.Amylase,
  Ingredient.Benzisothiazolinone,
  Ingredient.Colorants,
  Ingredient.Cellulase,
  Ingredient.Mannanase,
  Ingredient.SodiumMetaborate,
  Ingredient.DenatoniumBenzoate,
];

const PersilUltraPacsAdvancedCleanOxiPower: DetergentProfile = new DetergentProfile(
  'Ultra Pacs Advanced Clean OXI Power',
  'Persil',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-15'),
);
PersilUltraPacsAdvancedCleanOxiPower.countriesAvailable = ['USA', 'CAN'];

export default PersilUltraPacsAdvancedCleanOxiPower;
