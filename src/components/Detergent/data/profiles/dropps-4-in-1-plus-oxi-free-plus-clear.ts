import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.C12_14AlcoholsEthoxylated,
  Ingredient.Glycerin,
  Ingredient.Water,
  Ingredient.AlkylGlucoside,
  Ingredient.MEACocoate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.NonionicPolyester,
  Ingredient.MEALAS,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.ZincRicinoleate,
  Ingredient.QuaternisedHydrolyzedWheatProteinSiliconeCopolymer,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Lipase,
  Ingredient.PectateLyase,
  Ingredient.Mannanase,
  Ingredient.CitricAcid,
  Ingredient.SodiumSulfite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcohol,
];

const Dropps4In1PlusOxiFreeAndClear: DetergentProfile = new DetergentProfile(
  '4-in-1 Plus OXI Free + Clear',
  'Dropps',
  DetergentType.Pod,
  ingredients,
  new Date('2026-03-17'),
);
Dropps4In1PlusOxiFreeAndClear.countriesAvailable = ['USA'];

export default Dropps4In1PlusOxiFreeAndClear;
