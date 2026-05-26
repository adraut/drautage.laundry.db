import { Ingredient } from './Ingredient';
import { AnionicSurfactants } from './AnionicSurfactants';
import { AmphotericSurfactants } from './AmphotericSurfactants';
import { NonionicSurfactants } from './NonionicSurfactants';

const Surfactants: Set<Ingredient> = new Set([...AnionicSurfactants, ...AmphotericSurfactants, ...NonionicSurfactants]);

export { Surfactants };
