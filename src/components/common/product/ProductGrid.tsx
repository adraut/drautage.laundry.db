import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { useTheme } from '../../../context/ThemeContext';
import { CompositeFilterDescriptor, filterBy } from './utils/filterTypes';
import { ProductProfile } from './types/ProductProfile';
import { useGridFilterSync } from './hooks/useGridFilterSync';
import { useGridSortSync } from './hooks/useGridSortSync';
import { useProductUrlSync } from './hooks/useProductUrlSync';
import { findProductBySlug } from './utils/productSlug';
import { getDefaultSort } from './utils/gridSortUtils';
import { createEmptyFilter } from './utils/gridFilterUtils';
import { Drawer } from '../Drawer';
import { FilterDrawerContent } from './FilterDrawerContent';
import { FilterBar } from './FilterBar';
import { ProductDetailCard } from './ProductDetailCard';
import { ProductCategoryConfig } from './ProductCategoryConfig';
import {
  CompareContext,
  DEFAULT_COL_DEF,
  PRODUCT_COLUMN_DEFS,
  PRODUCT_FILTER_FIELDS,
  ProductClickContext,
} from './productGridColumns';
import './FilterDrawer.css';
import './FilterBar.css';
import './CompareBar.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnApiModule, ColumnAutoSizeModule, GridStateModule]);

const darkTheme = themeQuartz.withPart(colorSchemeDark);

interface ProductGridProps {
  config: ProductCategoryConfig;
}

export function ProductGrid({ config }: ProductGridProps) {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Map<string, ProductProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProfile | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set());
  const filterFields = config.filterFields ?? PRODUCT_FILTER_FIELDS;
  const { filter: urlFilter, updateFilterInUrl, resetFilterInUrl } = useGridFilterSync(filterFields);
  const { sortModel, updateSortInUrl, resetSortInUrl } = useGridSortSync();
  const { slug: productSlug, setProductSlug } = useProductUrlSync();
  const gridRef = useRef<AgGridReact<ProductProfile>>(null);
  const isFirstSortRender = useRef(true);
  const productUrlInitialized = useRef(false);

  // Store the initial filter from URL for reset functionality
  const initialFilterRef = useRef<CompositeFilterDescriptor | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await config.load();
        setProducts(data);
      } catch (error) {
        console.error(`Error loading ${config.pluralLower}:`, error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [config]);

  // Initialize filter from URL on mount and store as initial filter
  useEffect(() => {
    setFilter(urlFilter);
    // Store the initial filter from URL for reset functionality
    if (initialFilterRef.current === null) {
      // Deep clone the filter to avoid reference issues
      initialFilterRef.current = JSON.parse(JSON.stringify(urlFilter));
    }
  }, [urlFilter]);

  // Restore selected product from URL on initial data load
  useEffect(() => {
    if (products.size === 0 || productUrlInitialized.current) return;
    productUrlInitialized.current = true;
    if (!productSlug) return;
    const found = findProductBySlug(productSlug, products);
    if (found) setSelectedProduct(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Sync URL slug → selectedProduct for back/forward navigation
  useEffect(() => {
    if (!productUrlInitialized.current) return;
    if (!productSlug) {
      setSelectedProduct(null);
      return;
    }
    const found = findProductBySlug(productSlug, products);
    setSelectedProduct(found);
  }, [productSlug, products]);

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

  const handleNameClick = useCallback(
    (product: ProductProfile) => {
      setSelectedProduct(product);
      setProductSlug(product.slug);
    },
    [setProductSlug],
  );

  // Applies the default sort to the grid immediately and writes it to the URL.
  // Shared by resetFilter and clearFilter so both leave the grid in a stably-sorted
  // (not raw insertion-order) state — see the "Clear Filters" bug this fixed:
  // clearing to no sort at all fell back to the compiled module's insertion order,
  // which is not brand-alphabetical, so some brands (e.g. "9 Elements") ended up far
  // from the top of the (virtualized) grid instead of near it.
  const applyDefaultSort = useCallback(() => {
    const defaultSort = getDefaultSort();
    gridRef.current?.api.applyColumnState({
      state: defaultSort.map((item, idx) => ({ colId: item.colId, sort: item.sort, sortIndex: idx })),
      defaultState: { sort: null },
    });
    resetSortInUrl(defaultSort);
  }, [resetSortInUrl]);

  const resetFilter = useCallback(() => {
    // Reset to the initial filter from URL — use immediate variant to avoid debounce race with sort reset
    const resetToFilter = initialFilterRef.current || createEmptyFilter();
    setFilter(resetToFilter);
    resetFilterInUrl(resetToFilter);

    // Reset sort to default — immediate so both URL updates compose in the same React batch
    applyDefaultSort();
  }, [resetFilterInUrl, applyDefaultSort]);

  const clearFilter = useCallback(() => {
    // Always clear all filters, but keep the grid in its default sort order
    const emptyFilter = createEmptyFilter();
    setFilter(emptyFilter);
    resetFilterInUrl(emptyFilter);

    applyDefaultSort();
  }, [resetFilterInUrl, applyDefaultSort]);

  const handleCompareToggle = useCallback((product: ProductProfile) => {
    const slug = product.slug;
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const handleCompare = useCallback(() => {
    const params = new URLSearchParams();
    for (const slug of compareSet) {
      params.append('c', slug);
    }
    navigate(`${config.basePath}/compare?${params.toString()}`, {
      state: { returnTo: searchParams.toString() },
    });
  }, [compareSet, navigate, searchParams, config.basePath]);

  const productArray = useMemo(() => Array.from(products.values()), [products]);
  const filteredData = useMemo(() => (filter ? filterBy(productArray, filter) : productArray), [productArray, filter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <h1>{config.title}</h1>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading {config.pluralLower}...</p>
        </div>
      ) : loadError ? (
        <div role="alert" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Couldn't load {config.pluralLower}. Try refreshing the page.</p>
        </div>
      ) : products.size === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No {config.pluralLower} yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Vertical Filter Bar */}
          <FilterBar onClick={() => setIsDrawerOpen(true)} isVisible={!isDrawerOpen} />

          {/* Detail Card */}
          <ProductDetailCard
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setProductSlug(null);
            }}
          />

          {/* Filter Drawer */}
          <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={`Filter ${config.title}`}>
            <FilterDrawerContent
              fields={filterFields}
              filter={filter}
              onFilterChange={handleFilterChange}
              onReset={resetFilter}
              onClear={clearFilter}
            />
          </Drawer>

          {/* AG Grid */}
          <CompareContext.Provider value={{ compareSet, onCompareToggle: handleCompareToggle }}>
            <ProductClickContext.Provider value={handleNameClick}>
              <div style={{ flex: 1, minHeight: 0 }}>
                <AgGridReact<ProductProfile>
                  ref={gridRef}
                  theme={theme === 'dark' ? darkTheme : themeQuartz}
                  rowData={filteredData}
                  columnDefs={config.columnDefs ?? PRODUCT_COLUMN_DEFS}
                  defaultColDef={DEFAULT_COL_DEF}
                  suppressCellFocus={true}
                  initialState={{ sort: { sortModel } }}
                  onSortChanged={handleSortChanged}
                  autoSizeStrategy={{ type: 'fitCellContents' }}
                  suppressColumnVirtualisation={true}
                />
              </div>
            </ProductClickContext.Provider>
          </CompareContext.Provider>

          {/* Compare action bar */}
          {compareSet.size > 0 && (
            <div className="compare-bar">
              <button className="compare-bar-btn" onClick={handleCompare}>
                Compare
              </button>
              <button className="compare-bar-clear" onClick={() => setCompareSet(new Set())}>
                Clear
              </button>
              <span className="compare-bar-count">
                {compareSet.size} {compareSet.size === 1 ? 'product' : 'products'} selected
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
