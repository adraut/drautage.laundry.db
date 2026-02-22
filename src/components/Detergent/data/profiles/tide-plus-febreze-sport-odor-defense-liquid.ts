import { Ingredient } from '../../../common/types/Ingredient';
import { DetergentProfile } from '../../types/DetergentProfile';
import { DetergentType } from '../../types/DetergentType';

const ingredients: Ingredient[] = [
  Ingredient.Water,
  Ingredient.SodiumLaurethSulfate,
  Ingredient.SodiumC10_16Alkylbenzenesulfonate,
  Ingredient.MEACitrate,
  Ingredient.DiethyleneGlycol,
  Ingredient.PropyleneGlycol,
  Ingredient.Alcohol,
  Ingredient.PropoxylatedEthoxylatedAmine,
  Ingredient.PolyethyleneimineAlkoxylated,
  Ingredient.SodiumBorate,
  Ingredient.MEAC12_18FattyAcidsSalt,
  Ingredient.SodiumLaurylSulfate,
  Ingredient.MEAC10_16Alkylbenzenesulfonate,
  Ingredient.Fragrance,
  Ingredient.SodiumCitrate,
  Ingredient.PentasodiumPentetate,
  Ingredient.Ethanolamine,
  Ingredient.FluorescentBrightener71,
  Ingredient.SodiumBisulfite,
  Ingredient.PhenylpropylEthylMethicone,
  Ingredient.HydrogenatedCastorOil,
  Ingredient.CalciumFormate,
  Ingredient.MethoxypolyoxymethyleneMelamine,
  Ingredient.Subtilisin,
  Ingredient.Simethicone,
  Ingredient.Amylase,
  Ingredient.Trimethylsiloxysilicate,
  Ingredient.Mannanase,
];

const TidePlusFebrezeSportOdorDefenseLiquid: DetergentProfile = new DetergentProfile(
  'Plus Febreze Sport Odor Defense',
  'Tide',
  DetergentType.Liquid,
  ingredients,
  new Date('2026-02-21'),
);
TidePlusFebrezeSportOdorDefenseLiquid.countryOfOrigin = 'USA';
TidePlusFebrezeSportOdorDefenseLiquid.countriesAvailable = ['USA'];

export default TidePlusFebrezeSportOdorDefenseLiquid;
