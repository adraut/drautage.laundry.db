import { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  GridStateModule,
  themeQuartz,
  colorSchemeDark,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from '../../context/ThemeContext';
import { CompositeFilterDescriptor, filterBy } from './utils/filterTypes';
import { DetergentProfile } from './types/DetergentProfile';
import { DetergentType } from './types/DetergentType';
import { loadDetergents } from './data/detergents-data';
import { useGridFilterSync } from './hooks/useGridFilterSync';
import { useGridSortSync } from './hooks/useGridSortSync';
import { getDefaultSort } from './utils/gridSortUtils';
import { Drawer } from '../common/Drawer';
import { FilterDrawerContent } from './FilterDrawerContent';
import { FilterBar } from './FilterBar';
import { DetergentDetailCard } from './DetergentDetailCard';
import './FilterDrawer.css';
import './FilterBar.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnApiModule, ColumnAutoSizeModule, GridStateModule]);

const darkTheme = themeQuartz.withPart(colorSchemeDark);

// Define filter fields in the same order as grid columns
const FILTER_FIELDS = [
  { field: 'brand', title: 'Brand', type: 'text' as const },
  { field: 'name', title: 'Product Name', type: 'text' as const },
  {
    field: 'type',
    title: 'Type',
    type: 'enum' as const,
    options: Object.values(DetergentType),
  },
  { field: 'hasScents', title: 'Fragrance', type: 'boolean' as const },
  { field: 'hasOxygenBleach', title: 'Oxygen Bleach', type: 'boolean' as const },
  { field: 'hasOxygenBleachBoosters', title: 'Oxygen Bleach Boosters', type: 'boolean' as const },
  { field: 'hasOpticalBrighteners', title: 'Optical Brighteners', type: 'boolean' as const },
  { field: 'hasAmylase', title: 'Amylase', type: 'boolean' as const },
  { field: 'hasCellulase', title: 'Cellulase', type: 'boolean' as const },
  { field: 'hasDNase', title: 'DNase', type: 'boolean' as const },
  { field: 'hasLipase', title: 'Lipase', type: 'boolean' as const },
  { field: 'hasMannanase', title: 'Mannanase', type: 'boolean' as const },
  { field: 'hasPectinase', title: 'Pectinase', type: 'boolean' as const },
  { field: 'hasProtease', title: 'Protease', type: 'boolean' as const },
  { field: 'hasEnzymeStabilizers', title: 'Enzyme Stabilizers', type: 'boolean' as const },
  { field: 'hasDyeTransferInhibitors', title: 'Dye Transfer Inhibitors', type: 'boolean' as const },
  { field: 'hasSoilAntiRedepositionAgents', title: 'Soil Anti-Redeposition', type: 'boolean' as const },
  { field: 'hasSoilReleaseAgents', title: 'Soil Release', type: 'boolean' as const },
  { field: 'hasSoaps', title: 'Soaps', type: 'boolean' as const },
  { field: 'hasDyes', title: 'Dyes', type: 'boolean' as const },
  { field: 'hasAmphotericSurfactants', title: 'Amphoteric Surfactants', type: 'boolean' as const },
  { field: 'hasAnionicSurfactants', title: 'Anionic Surfactants', type: 'boolean' as const },
  { field: 'hasNonionicSurfactants', title: 'Nonionic Surfactants', type: 'boolean' as const },
  { field: 'hasBuilders', title: 'Builders', type: 'boolean' as const },
  { field: 'hasFabricConditioners', title: 'Fabric Conditioners', type: 'boolean' as const },
  { field: 'hasFabricAntioxidants', title: 'Fabric Antioxidants', type: 'boolean' as const },
  { field: 'hasFillers', title: 'Fillers', type: 'boolean' as const },
  { field: 'countriesAvailable', title: 'Countries Available', type: 'text' as const },
  { field: 'lastUpdatedFormatted', title: 'Last Updated', type: 'date' as const },
  { field: 'dataSource', title: 'Datasource', type: 'text' as const },
];

// Context so NameCellRenderer (module-level, stable reference) can call back into Detergents
const DetergentClickContext = createContext<(detergent: DetergentProfile) => void>(() => {});

// Module-level component — stable reference, avoids AG Grid remounting cells on each render
function NameCellRenderer(params: ICellRendererParams<DetergentProfile>) {
  const onNameClick = useContext(DetergentClickContext);
  const { data } = params;
  if (!data) return null;
  return (
    <button className="detergent-name-btn" onClick={() => onNameClick(data)}>
      {data.name}
    </button>
  );
}

function BooleanCellRenderer(params: ICellRendererParams<DetergentProfile>) {
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

const DEFAULT_COL_DEF: ColDef<DetergentProfile> = {
  sortable: true,
  resizable: true,
  filter: false,
  cellDataType: false,
};

const BOOLEAN_COL: Partial<ColDef<DetergentProfile>> = { cellRenderer: BooleanCellRenderer };

const TEXT_COL: Partial<ColDef<DetergentProfile>> = {
  comparator: (a: string, b: string) => (a ?? '').toLowerCase().localeCompare((b ?? '').toLowerCase()),
};

const COLUMN_DEFS: ColDef<DetergentProfile>[] = [
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
  { field: 'hasDyes', headerName: 'Dyes', ...BOOLEAN_COL },
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

function Detergents() {
  const { theme } = useTheme();
  const [detergents, setDetergents] = useState<Map<string, DetergentProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDetergent, setSelectedDetergent] = useState<DetergentProfile | null>(null);
  const { filter: urlFilter, updateFilterInUrl, resetFilterInUrl } = useGridFilterSync();
  const { sortModel, updateSortInUrl, resetSortInUrl } = useGridSortSync();
  const gridRef = useRef<AgGridReact<DetergentProfile>>(null);
  const isFirstSortRender = useRef(true);

  // Store the initial filter from URL for reset functionality
  const initialFilterRef = useRef<CompositeFilterDescriptor | null>(null);

  useEffect(() => {
    const fetchDetergents = async () => {
      try {
        const data = await loadDetergents();
        setDetergents(data);
      } catch (error) {
        console.error('Error loading detergents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetergents();
  }, []);

  // Initialize filter from URL on mount and store as initial filter
  useEffect(() => {
    if (urlFilter) {
      setFilter(urlFilter);
      // Store the initial filter from URL for reset functionality
      if (initialFilterRef.current === null) {
        // Deep clone the filter to avoid reference issues
        initialFilterRef.current = JSON.parse(JSON.stringify(urlFilter));
      }
    }
  }, [urlFilter]);

  // Handle filter changes from FilterDrawer and update URL
  const handleFilterChange = useCallback(
    (newFilter: CompositeFilterDescriptor) => {
      setFilter(newFilter);
      updateFilterInUrl(newFilter);
    },
    [updateFilterInUrl],
  );

  // Apply sort model to grid when URL changes (e.g. browser back/forward).
  // Skip the first render — initialState handles that.
  useEffect(() => {
    if (isFirstSortRender.current) {
      isFirstSortRender.current = false;
      return;
    }
    const api = gridRef.current?.api;
    if (!api) return;
    api.applyColumnState({
      state: sortModel.map((item, idx) => ({ colId: item.colId, sort: item.sort, sortIndex: idx })),
      defaultState: { sort: null },
    });
  }, [sortModel]);

  const handleSortChanged = useCallback(() => {
    const api = gridRef.current?.api;
    if (!api) return;
    const colState = api.getColumnState();
    const sorted = colState
      .filter((col) => col.sort)
      .sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0))
      .map((col) => ({ colId: col.colId, sort: col.sort as 'asc' | 'desc' }));
    updateSortInUrl(sorted);
  }, [updateSortInUrl]);

  const handleNameClick = useCallback((detergent: DetergentProfile) => {
    setSelectedDetergent(detergent);
  }, []);

  const resetFilter = useCallback(() => {
    // Reset to the initial filter from URL — use immediate variant to avoid debounce race with sort reset
    const resetToFilter = initialFilterRef.current || { logic: 'and' as const, filters: [] };
    setFilter(resetToFilter);
    resetFilterInUrl(resetToFilter);

    // Reset sort to default — immediate so both URL updates compose in the same React batch
    const defaultSort = getDefaultSort();
    gridRef.current?.api.applyColumnState({
      state: defaultSort.map((item, idx) => ({ colId: item.colId, sort: item.sort, sortIndex: idx })),
      defaultState: { sort: null },
    });
    resetSortInUrl(defaultSort);
  }, [resetFilterInUrl, resetSortInUrl]);

  const clearFilter = useCallback(() => {
    // Always clear all filters and sort
    const emptyFilter = { logic: 'and' as const, filters: [] };
    setFilter(emptyFilter);
    resetFilterInUrl(emptyFilter);

    gridRef.current?.api.applyColumnState({ defaultState: { sort: null } });
    resetSortInUrl([]);
  }, [resetFilterInUrl, resetSortInUrl]);

  const detergentArray = useMemo(() => Array.from(detergents.values()), [detergents]);
  const filteredData = useMemo(
    () => (filter ? filterBy(detergentArray, filter) : detergentArray),
    [detergentArray, filter],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <h1>Detergents</h1>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading detergents...</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Vertical Filter Bar */}
          <FilterBar onClick={() => setIsDrawerOpen(true)} isVisible={!isDrawerOpen} />

          {/* Detail Card */}
          <DetergentDetailCard detergent={selectedDetergent} onClose={() => setSelectedDetergent(null)} />

          {/* Filter Drawer */}
          <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Filter Detergents">
            <FilterDrawerContent
              fields={FILTER_FIELDS}
              filter={filter}
              onFilterChange={handleFilterChange}
              onReset={resetFilter}
              onClear={clearFilter}
            />
          </Drawer>

          {/* AG Grid */}
          <DetergentClickContext.Provider value={handleNameClick}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <AgGridReact<DetergentProfile>
                ref={gridRef}
                theme={theme === 'dark' ? darkTheme : themeQuartz}
                rowData={filteredData}
                columnDefs={COLUMN_DEFS}
                defaultColDef={DEFAULT_COL_DEF}
                suppressCellFocus={true}
                initialState={{ sort: { sortModel } }}
                onSortChanged={handleSortChanged}
                autoSizeStrategy={{ type: 'fitCellContents' }}
                suppressColumnVirtualisation={true}
              />
            </div>
          </DetergentClickContext.Provider>
        </div>
      )}
    </div>
  );
}

export default Detergents;
