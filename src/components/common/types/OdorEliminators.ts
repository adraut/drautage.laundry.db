import { Ingredient } from './Ingredient';

const OdorEliminators: Set<Ingredient> = new Set();

OdorEliminators.add(Ingredient.HydroxypropylCyclodextrin);
OdorEliminators.add(Ingredient.TeaTreeOil);
OdorEliminators.add(Ingredient.ZincRicinoleate);

export { OdorEliminators };
