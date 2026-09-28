import { ProductCompareView } from '../common/product/ProductCompareView';
import { detergentConfig } from './detergentConfig';

export function CompareView() {
  return <ProductCompareView config={detergentConfig} />;
}

export default CompareView;
