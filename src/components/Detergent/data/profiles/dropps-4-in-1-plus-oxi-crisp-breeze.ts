import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';
import { DataSource } from '../../types/DataSource';

const ingredients: Ingredient[] = [
  Ingredient.C12_14AlcoholsEthoxylated,
  Ingredient.Glycerin,
  Ingredient.Water,
  Ingredient.AlkylGlucoside,
  Ingredient.MEACocoate,
  Ingredient.PropyleneGlycol,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.NonionicPolyester,
  Ingredient.Fragrance,
  Ingredient.MEALAS,
  Ingredient.TetrasodiumGlutamateDiacetate,
  Ingredient.ZincRicinoleate,
  Ingredient.QuaternisedHydrolyzedWheatProteinSiliconeCopolymer,
  Ingredient.Subtilisin,
  Ingredient.Amylase,
  Ingredient.Lipase,
  Ingredient.PectateLyase,
  Ingredient.Mannanase,
  Ingredient.EugeniaCaryphyllusLeafOil,
  Ingredient.EucalyptusGlobusLeafOil,
  Ingredient.MenthaArvensisLeafOil,
  Ingredient.CitricAcid,
  Ingredient.SodiumSulfite,
  Ingredient.DenatoniumBenzoate,
  Ingredient.PolyvinylAlcohol,
];

const Dropps4In1PlusOxiCrispBreeze: DetergentProfile = new DetergentProfile(
  '4-in-1 Plus OXI Crisp Breeze',
  'Dropps',
  DetergentType.Pod,
  DataSource.Package,
  ingredients,
  new Date('2026-03-17'),
);
Dropps4In1PlusOxiCrispBreeze.countriesAvailable = ['USA'];

export default Dropps4In1PlusOxiCrispBreeze;
