import { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ModuleRegistry, ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { CompositeFilterDescriptor, filterBy } from './utils/filterTypes';
import { DetergentProfile } from './types/DetergentProfile';
import { DetergentType } from './types/DetergentType';
import { loadDetergents } from './data/detergents-data';
import { useGridFilterSync } from './hooks/useGridFilterSync';
import { Drawer } from '../common/Drawer';
import { FilterDrawerContent } from './FilterDrawerContent';
import { FilterBar } from './FilterBar';
import { DetergentDetailCard } from './DetergentDetailCard';
import './FilterDrawer.css';
import './FilterBar.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

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
  { field: 'hasOxygenBleach', title: 'Oxygen Bleach', type: 'boolean' as const },
  { field: 'hasTAED', title: 'TAED', type: 'boolean' as const },
  { field: 'hasOpticalBrighteners', title: 'Optical Brighteners', type: 'boolean' as const },
  { field: 'hasAmylase', title: 'Amylase', type: 'boolean' as const },
  { field: 'hasCellulase', title: 'Cellulase', type: 'boolean' as const },
  { field: 'hasDNase', title: 'DNase', type: 'boolean' as const },
  { field: 'hasLipase', title: 'Lipase', type: 'boolean' as const },
  { field: 'hasMannanase', title: 'Mannanase', type: 'boolean' as const },
  { field: 'hasPectinase', title: 'Pectinase', type: 'boolean' as const },
  { field: 'hasProtease', title: 'Protease', type: 'boolean' as const },
  { field: 'hasScents', title: 'Scents', type: 'boolean' as const },
  { field: 'hasSoaps', title: 'Soaps', type: 'boolean' as const },
  { field: 'isHardWaterTolerant', title: 'Hard Water Tolerant', type: 'boolean' as const },
  { field: 'hasDyes', title: 'Dyes', type: 'boolean' as const },
  { field: 'hasAnionicSurfactants', title: 'Anionic Surfactants', type: 'boolean' as const },
  { field: 'hasNonionicSurfactants', title: 'Nonionic Surfactants', type: 'boolean' as const },
  { field: 'isBiodegradable', title: 'Biodegradable', type: 'boolean' as const },
  { field: 'isSepticSafe', title: 'Septic Safe', type: 'boolean' as const },
  { field: 'countriesAvailable', title: 'Countries Available', type: 'text' as const },
  { field: 'lastUpdatedFormatted', title: 'Last Updated', type: 'date' as const },
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

const DEFAULT_COL_DEF: ColDef<DetergentProfile> = {
  sortable: true,
  resizable: true,
  filter: false,
  cellDataType: false,
};

const COLUMN_DEFS: ColDef<DetergentProfile>[] = [
  { field: 'brand', headerName: 'Brand' },
  { field: 'name', headerName: 'Product Name', cellRenderer: NameCellRenderer, sort: 'asc' },
  { field: 'type', headerName: 'Type' },
  { field: 'hasOxygenBleach', headerName: 'Oxygen Bleach' },
  { field: 'hasTAED', headerName: 'TAED' },
  { field: 'hasOpticalBrighteners', headerName: 'Optical Brighteners' },
  { field: 'hasAmylase', headerName: 'Amylase' },
  { field: 'hasCellulase', headerName: 'Cellulase' },
  { field: 'hasDNase', headerName: 'DNase' },
  { field: 'hasLipase', headerName: 'Lipase' },
  { field: 'hasMannanase', headerName: 'Mannanase' },
  { field: 'hasPectinase', headerName: 'Pectinase' },
  { field: 'hasProtease', headerName: 'Protease' },
  { field: 'hasScents', headerName: 'Scents' },
  { field: 'hasSoaps', headerName: 'Soaps' },
  { field: 'hasDyes', headerName: 'Dyes' },
  { field: 'hasAnionicSurfactants', headerName: 'Anionic Surfactants' },
  { field: 'hasNonionicSurfactants', headerName: 'Nonionic Surfactants' },
  { field: 'isBiodegradable', headerName: 'Biodegradable' },
  { field: 'isSepticSafe', headerName: 'Septic Safe' },
  { field: 'countriesAvailable', headerName: 'Countries Available' },
  { field: 'lastUpdatedFormatted', headerName: 'Last Updated' },
];

function Detergents() {
  const [detergents, setDetergents] = useState<Map<string, DetergentProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDetergent, setSelectedDetergent] = useState<DetergentProfile | null>(null);
  const { filter: urlFilter, updateFilterInUrl } = useGridFilterSync();

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

  const handleNameClick = useCallback((detergent: DetergentProfile) => {
    setSelectedDetergent(detergent);
  }, []);

  const resetFilter = useCallback(() => {
    // Reset to the initial filter from URL
    const resetToFilter = initialFilterRef.current || { logic: 'and' as const, filters: [] };
    setFilter(resetToFilter);
    updateFilterInUrl(resetToFilter);
  }, [updateFilterInUrl]);

  const clearFilter = useCallback(() => {
    // Always clear all filters
    const emptyFilter = { logic: 'and' as const, filters: [] };
    setFilter(emptyFilter);
    updateFilterInUrl(emptyFilter);
  }, [updateFilterInUrl]);

  const detergentArray = useMemo(() => Array.from(detergents.values()), [detergents]);
  const filteredData = useMemo(
    () => (filter ? filterBy(detergentArray, filter) : detergentArray),
    [detergentArray, filter],
  );

  return (
    <div>
      <h1>Detergents</h1>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading detergents...</p>
        </div>
      ) : (
        <div>
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
            <div style={{ minWidth: '95vw' }}>
              <AgGridReact<DetergentProfile>
                theme={themeQuartz}
                rowData={filteredData}
                columnDefs={COLUMN_DEFS}
                defaultColDef={DEFAULT_COL_DEF}
                domLayout="autoHeight"
                suppressRowClickSelection={true}
                suppressCellFocus={true}
              />
            </div>
          </DetergentClickContext.Provider>
        </div>
      )}
    </div>
  );
}

export default Detergents;
