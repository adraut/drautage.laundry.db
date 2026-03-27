import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_7,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.Glycerin,
  Ingredient.Ethanol,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.CoconutFattyAcid,
  Ingredient.Amylase,
  Ingredient.CalciumChloride,
  Ingredient.CitricAcid,
  Ingredient.DenatoniumBenzoate,
  Ingredient.DistyrylbiphenolSulfonate,
  Ingredient.Mannanase,
  Ingredient.NonionicPolyester,
  Ingredient.Pectinase,
  Ingredient.PropyleneGlycol,
  Ingredient.Protease,
  Ingredient.SodiumCarboxymethylInulin,
  Ingredient.SodiumCocoate,
  Ingredient.SodiumHydroxide,
  Ingredient.Methylisothiazolinone,
];

const MethodLaundryDetergentFreeClear: DetergentProfile = new DetergentProfile(
  'free + clear',
  'Method',
  DetergentType.Liquid,
  DataSource.Package,
  ingredients,
  new Date('2026-03-27'),
);

export default MethodLaundryDetergentFreeClear;
