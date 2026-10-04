import { createContext, useContext } from 'react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ProductProfile } from './types/ProductProfile';
import { ProductType } from './types/ProductType';
import type { FilterField } from './FilterDrawerContent';

// Define filter fields in the same order as grid columns
export const PRODUCT_FILTER_FIELDS: FilterField[] = [
  { field: 'brand', title: 'Brand', type: 'text' },
  { field: 'name', title: 'Product Name', type: 'text' },
  {
    field: 'type',
    title: 'Type',
    type: 'enum',
    options: Object.values(ProductType),
  },
  { field: 'hasScents', title: 'Fragrance', type: 'boolean' },
  { field: 'hasIsothiazolinones', title: 'Isothiazolinones', type: 'boolean' },
  { field: 'hasOxygenBleach', title: 'Oxygen Bleach', type: 'boolean' },
  { field: 'hasOxygenBleachBoosters', title: 'Oxygen Bleach Boosters', type: 'boolean' },
  { field: 'hasOpticalBrighteners', title: 'Optical Brighteners', type: 'boolean' },
  { field: 'hasAmylase', title: 'Amylase', type: 'boolean' },
  { field: 'hasCellulase', title: 'Cellulase', type: 'boolean' },
  { field: 'hasDNase', title: 'DNase', type: 'boolean' },
  { field: 'hasLipase', title: 'Lipase', type: 'boolean' },
  { field: 'hasMannanase', title: 'Mannanase', type: 'boolean' },
  { field: 'hasPectinase', title: 'Pectinase', type: 'boolean' },
  { field: 'hasProtease', title: 'Protease', type: 'boolean' },
  { field: 'hasEnzymeStabilizers', title: 'Enzyme Stabilizers', type: 'boolean' },
  { field: 'hasDyeTransferInhibitors', title: 'Dye Transfer Inhibitors', type: 'boolean' },
  { field: 'hasSoilAntiRedepositionAgents', title: 'Soil Anti-Redeposition', type: 'boolean' },
  { field: 'hasSoilReleaseAgents', title: 'Soil Release', type: 'boolean' },
  { field: 'hasSoaps', title: 'Soaps', type: 'boolean' },
  { field: 'hasColorants', title: 'Colorants', type: 'boolean' },
  { field: 'hasAmphotericSurfactants', title: 'Amphoteric Surfactants', type: 'boolean' },
  { field: 'hasAnionicSurfactants', title: 'Anionic Surfactants', type: 'boolean' },
  { field: 'hasSulfates', title: 'Sulfates', type: 'boolean' },
  { field: 'hasNonionicSurfactants', title: 'Nonionic Surfactants', type: 'boolean' },
  { field: 'hasBuilders', title: 'Builders', type: 'boolean' },
  { field: 'hasFabricConditioners', title: 'Fabric Conditioners', type: 'boolean' },
  { field: 'hasFabricAntioxidants', title: 'Fabric Antioxidants', type: 'boolean' },
  { field: 'hasFillers', title: 'Fillers', type: 'boolean' },
  { field: 'countriesAvailable', title: 'Countries Available', type: 'text' },
  { field: 'lastUpdatedFormatted', title: 'Last Updated', type: 'date' },
  { field: 'dataSource', title: 'Datasource', type: 'text' },
];

// Context so NameCellRenderer (module-level, stable reference) can call back into ProductGrid
export const ProductClickContext = createContext<(product: ProductProfile) => void>(() => {});

// Module-level component — stable reference, avoids AG Grid remounting cells on each render
function NameCellRenderer(params: ICellRendererParams<ProductProfile>) {
  const onNameClick = useContext(ProductClickContext);
  const { data } = params;
  if (!data) return null;
  return (
    <button className="product-name-btn" onClick={() => onNameClick(data)}>
      {data.name}
    </button>
  );
}

interface CompareContextValue {
  compareSet: Set<string>;
  onCompareToggle: (product: ProductProfile) => void;
}
export const CompareContext = createContext<CompareContextValue>({
  compareSet: new Set(),
  onCompareToggle: () => {},
});

function CompareCellRenderer(params: ICellRendererParams<ProductProfile>) {
  const { compareSet, onCompareToggle } = useContext(CompareContext);
  const { data } = params;
  if (!data) return null;
  const slug = data.slug;
  return (
    <input
      type="checkbox"
      checked={compareSet.has(slug)}
      onChange={() => onCompareToggle(data)}
      aria-label={`Select ${data.brand} ${data.name} for comparison`}
    />
  );
}

function BooleanCellRenderer(params: ICellRendererParams<ProductProfile>) {
  return (
    <input
      type="checkbox"
      checked={!!params.value}
      onChange={() => {}}
      tabIndex={-1}
      style={{ cursor: 'default', pointerEvents: 'none' }}
    />
  );
}

export const DEFAULT_COL_DEF: ColDef<ProductProfile> = {
  sortable: true,
  resizable: true,
  filter: false,
  cellDataType: false,
};

const BOOLEAN_COL: Partial<ColDef<ProductProfile>> = { cellRenderer: BooleanCellRenderer };

const TEXT_COL: Partial<ColDef<ProductProfile>> = {
  comparator: (a: string, b: string) => (a ?? '').toLowerCase().localeCompare((b ?? '').toLowerCase()),
};

export const PRODUCT_COLUMN_DEFS: ColDef<ProductProfile>[] = [
  { headerName: '', width: 50, cellRenderer: CompareCellRenderer, sortable: false, resizable: false },
  { field: 'brand', headerName: 'Brand', ...TEXT_COL },
  { field: 'name', headerName: 'Product Name', cellRenderer: NameCellRenderer, ...TEXT_COL },
  { field: 'type', headerName: 'Type', ...TEXT_COL },
  { field: 'hasOxygenBleach', headerName: 'Oxygen Bleach', ...BOOLEAN_COL },
  { field: 'hasOxygenBleachBoosters', headerName: 'Oxygen Bleach Boosters', ...BOOLEAN_COL },
  { field: 'hasOpticalBrighteners', headerName: 'Optical Brighteners', ...BOOLEAN_COL },
  { field: 'hasScents', headerName: 'Fragranced', ...BOOLEAN_COL },
  { field: 'hasAmylase', headerName: 'Amylase', ...BOOLEAN_COL },
  { field: 'hasCellulase', headerName: 'Cellulase', ...BOOLEAN_COL },
  { field: 'hasDNase', headerName: 'DNase', ...BOOLEAN_COL },
  { field: 'hasLipase', headerName: 'Lipase', ...BOOLEAN_COL },
  { field: 'hasMannanase', headerName: 'Mannanase', ...BOOLEAN_COL },
  { field: 'hasPectinase', headerName: 'Pectinase', ...BOOLEAN_COL },
  { field: 'hasProtease', headerName: 'Protease', ...BOOLEAN_COL },
  { field: 'hasDyeTransferInhibitors', headerName: 'Dye Transfer Inhibitors', ...BOOLEAN_COL },
  { field: 'hasSoilAntiRedepositionAgents', headerName: 'Soil Anti-Redeposition', ...BOOLEAN_COL },
  { field: 'hasSoilReleaseAgents', headerName: 'Soil Release', ...BOOLEAN_COL },
  { field: 'hasColorants', headerName: 'Colorants', ...BOOLEAN_COL },
  { field: 'hasSoaps', headerName: 'Soaps', ...BOOLEAN_COL },
  { field: 'hasAmphotericSurfactants', headerName: 'Amphoteric Surfactants', ...BOOLEAN_COL },
  { field: 'hasAnionicSurfactants', headerName: 'Anionic Surfactants', ...BOOLEAN_COL },
  { field: 'hasNonionicSurfactants', headerName: 'Nonionic Surfactants', ...BOOLEAN_COL },
  { field: 'hasBuilders', headerName: 'Builders', ...BOOLEAN_COL },
  { field: 'hasFabricConditioners', headerName: 'Fabric Conditioners', ...BOOLEAN_COL },
  { field: 'hasFabricAntioxidants', headerName: 'Fabric Antioxidants', ...BOOLEAN_COL },
  { field: 'hasFillers', headerName: 'Fillers', ...BOOLEAN_COL },
  { field: 'countriesAvailable', headerName: 'Countries Available' },
  { field: 'lastUpdatedFormatted', headerName: 'Last Updated' },
  { field: 'dataSource', headerName: 'Datasource' },
];
