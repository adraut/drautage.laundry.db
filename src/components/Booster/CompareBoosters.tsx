import { ProductCompareView } from '../common/product/ProductCompareView';
import { boosterConfig } from './boosterConfig';

export function CompareBoosters() {
  return <ProductCompareView config={boosterConfig} />;
}

export default CompareBoosters;
