import { useState, useEffect, useCallback, useMemo } from 'react';
import { Grid, GridColumn as Column, GridFilterChangeEvent } from '@progress/kendo-react-grid';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import { IDetergentProfile } from './types/DetergentProfile';
import { loadDetergents } from './data/detergents-data';
import { useGridFilterSync } from './hooks/useGridFilterSync';
import { getDefaultFilter } from './utils/gridFilterUtils';

function Detergents() {
  const [detergents, setDetergents] = useState<Map<string, IDetergentProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const { filter: urlFilter, updateFilterInUrl } = useGridFilterSync();

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

  // Initialize filter from URL on mount
  useEffect(() => {
    if (urlFilter) {
      setFilter(urlFilter);
    }
  }, [urlFilter]);

  // Handle filter changes from Grid and update URL
  const handleFilterChange = useCallback(
    (e: GridFilterChangeEvent) => {
      const newFilter = e.filter;
      setFilter(newFilter);
      updateFilterInUrl(newFilter);
    },
    [updateFilterInUrl]
  );

  const resetFilter = useCallback(() => {
    const defaultFilter = getDefaultFilter();
    setFilter(defaultFilter);
    updateFilterInUrl(defaultFilter);
  }, [updateFilterInUrl]);

  const clearFilter = useCallback(() => {
    setFilter(null);
    updateFilterInUrl({ logic: 'and', filters: [] });
  }, [updateFilterInUrl]);

  const detergentArray = useMemo(() => Array.from(detergents.values()), [detergents]);
  const filteredData = useMemo(
    () => (filter ? filterBy(detergentArray, filter) : detergentArray),
    [detergentArray, filter]
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={resetFilter} style={{ marginBottom: '1rem' }}>
              Reset Filters
            </button>
            <button onClick={clearFilter} style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
              Clear Filters
            </button>
          </div>
          <Grid
            data={filteredData}
            style={{ minHeight: '75vh', minWidth: '95vw' }}
            selectable={{ enabled: true, mode: 'single' }}
            filterable={true}
            editable={false}
            reorderable={true}
            sortable={{ allowUnsort: true, mode: 'single' }}
            resizable={false}
            scrollable='none'
            filter={filter || undefined}
            onFilterChange={handleFilterChange}
          >
            <Column field="name" title="Name" sortable filterable />
            <Column field="brand" title="Brand" sortable filterable />
            <Column field="type" title="Type" sortable filterable />
            <Column field="hasOxygenBleach" title="Oxygen Bleach" filter='boolean' sortable filterable />
            <Column field="hasOpticalBrighteners" title="Optical Brighteners" filter='boolean' sortable filterable />
            <Column field="hasAmylase" title="Amylase" filter='boolean' sortable filterable />
            <Column field="hasCellulase" title="Cellulase" filter='boolean' sortable filterable />
            <Column field="hasDNase" title="DNase" filter='boolean' sortable filterable />
            <Column field="hasLipase" title="Lipase" filter='boolean' sortable filterable />
            <Column field="hasMannanase" title="Mannanase" filter='boolean' sortable filterable />
            <Column field="hasPectinase" title="Pectinase" filter='boolean' sortable filterable />
            <Column field="hasProtease" title="Protease" filter='boolean' sortable filterable />
            <Column field="hasScents" title="Scents" filter='boolean' sortable filterable />
            <Column field="hasSoaps" title="Soaps" filter='boolean' sortable filterable />
            <Column field="isHardWaterTolerant" title="Hard Water Tolerant" filter='boolean' sortable filterable />
            <Column field="hasDyes" title="Dyes" filter='boolean' sortable filterable />
            <Column field="hasAnionicSurfactants" title="Anionic Surfactants" filter='boolean' sortable filterable />
            <Column field="hasNonionicSurfactants" title="Nonionic Surfactants" filter='boolean' sortable filterable />
            <Column field="isBiodegradable" title="Biodegradable" filter='boolean' sortable filterable />
            <Column field="isSepticSafe" title="Septic Safe" filter='boolean' sortable filterable />
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Detergents;
