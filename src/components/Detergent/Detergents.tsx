import { ProductGrid } from '../common/product/ProductGrid';
import { detergentConfig } from './detergentConfig';

function Detergents() {
  return <ProductGrid config={detergentConfig} />;
}

export default Detergents;
