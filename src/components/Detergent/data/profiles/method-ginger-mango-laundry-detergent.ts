import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.Laureth_7,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.Glycerin,
  Ingredient.Ethanol,
  Ingredient.TrisodiumDicarboxymethylAlaninate,
  Ingredient.CoconutFattyAcid,
  Ingredient.Fragrance,
  Ingredient.Amylase,
  Ingredient.CalciumChloride,
  Ingredient.CitricAcid,
  Ingredient.DenatoniumBenzoate,
  Ingredient.DisodiumDistyrylbiphenylDisulfonate,
  Ingredient.Mannanase,
  Ingredient.NonionicPolyester,
  Ingredient.Pectinase,
  Ingredient.PropyleneGlycol,
  Ingredient.Protease,
  Ingredient.SodiumCarboxymethylInulin,
  Ingredient.SodiumCocoate,
  Ingredient.SodiumHydroxide,
  Ingredient.Methylisothiazolinone,
  Ingredient.PolymericOrange,
];

const MethodGingerMangoLaundryDetergent: DetergentProfile = new DetergentProfile(
  'Ginger Mango',
  'Method',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-03-17'),
);

export default MethodGingerMangoLaundryDetergent;
