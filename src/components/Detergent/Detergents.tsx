import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Grid, GridColumn as Column, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { CompositeFilterDescriptor, filterBy, orderBy, SortDescriptor } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import { DetergentProfile } from './types/DetergentProfile';
import { loadDetergents } from './data/detergents-data';
import { useGridFilterSync } from './hooks/useGridFilterSync';
import { Drawer } from '../common/Drawer';
import { FilterDrawerContent } from './FilterDrawerContent';
import { FilterBar } from './FilterBar';
import './FilterDrawer.css';
import './FilterBar.css';

// Define filter fields in the same order as grid columns
const FILTER_FIELDS = [
  { field: 'brand', title: 'Brand', type: 'text' as const },
  { field: 'name', title: 'Product Name', type: 'text' as const },
  { field: 'type', title: 'Type', type: 'text' as const },
  { field: 'hasOxygenBleach', title: 'Oxygen Bleach', type: 'boolean' as const },
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

function Detergents() {
  const [detergents, setDetergents] = useState<Map<string, DetergentProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const [sort, setSort] = useState<SortDescriptor[]>([{ field: 'name', dir: 'asc' }]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    [updateFilterInUrl]
  );

  // Handle sort changes from Grid
  const handleSortChange = useCallback((e: GridSortChangeEvent) => {
    setSort(e.sort);
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
    [detergentArray, filter]
  );
  const sortedAndFilteredData = useMemo(
    () => (sort && sort.length > 0 ? orderBy(filteredData, sort) : filteredData),
    [filteredData, sort]
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
          <FilterBar 
            onClick={() => setIsDrawerOpen(true)}
            isVisible={!isDrawerOpen}
          />
          
          {/* Filter Drawer */}
          <Drawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)}
            title="Filter Detergents"
          >
            <FilterDrawerContent 
              fields={FILTER_FIELDS}
              filter={filter}
              onFilterChange={handleFilterChange}
              onReset={resetFilter}
              onClear={clearFilter}
            />
          </Drawer>

          {/* Grid with filter row hidden */}
          <Grid
            data={sortedAndFilteredData}
            style={{ minHeight: '75vh', minWidth: '95vw' }}
            selectable={{ enabled: true, mode: 'single' }}
            filterable={false}
            editable={false}
            reorderable={true}
            sortable={{ allowUnsort: true, mode: 'single' }}
            resizable={true}
            scrollable='none'
            sort={sort}
            onSortChange={handleSortChange}
          >
            <Column field="brand" title="Brand" sortable />
            <Column field="name" title="Product Name" sortable />
            <Column field="type" title="Type" sortable />
            <Column field="hasOxygenBleach" title="Oxygen Bleach" sortable />
            <Column field="hasOpticalBrighteners" title="Optical Brighteners" sortable />
            <Column field="hasAmylase" title="Amylase" sortable />
            <Column field="hasCellulase" title="Cellulase" sortable />
            <Column field="hasDNase" title="DNase" sortable />
            <Column field="hasLipase" title="Lipase" sortable />
            <Column field="hasMannanase" title="Mannanase" sortable />
            <Column field="hasPectinase" title="Pectinase" sortable />
            <Column field="hasProtease" title="Protease" sortable />
            <Column field="hasScents" title="Scents" sortable />
            <Column field="hasSoaps" title="Soaps" sortable />
            <Column field="isHardWaterTolerant" title="Hard Water Tolerant" sortable />
            <Column field="hasDyes" title="Dyes" sortable />
            <Column field="hasAnionicSurfactants" title="Anionic Surfactants" sortable />
            <Column field="hasNonionicSurfactants" title="Nonionic Surfactants" sortable />
            <Column field="isBiodegradable" title="Biodegradable" sortable />
            <Column field="isSepticSafe" title="Septic Safe" sortable />
            <Column field="countriesAvailable" title="Countries Available" sortable />
            <Column field="lastUpdatedFormatted" title="Last Updated" sortable />
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Detergents;
