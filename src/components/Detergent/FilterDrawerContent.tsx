import { useState, useMemo, ChangeEvent } from 'react';
import { CompositeFilterDescriptor, FilterDescriptor } from './utils/filterTypes';
import './FilterDrawer.css';

interface FilterField {
  field: string;
  title: string;
  // Note: 'date' type uses text input for filtering formatted date strings (e.g., "2026-01-31")
  // since the grid displays pre-formatted date strings, not Date objects
  type: 'text' | 'boolean' | 'date' | 'enum';
  options?: string[]; // Available options for enum type fields
}

interface FilterDrawerContentProps {
  fields: FilterField[];
  filter: CompositeFilterDescriptor | null;
  onFilterChange: (filter: CompositeFilterDescriptor) => void;
  onReset: () => void;
  onClear: () => void;
}

type BooleanFilterValue = 'true' | 'false' | '';

/**
 * Content component for the filter drawer
 * Provides filter inputs for all grid columns with search functionality
 */
export function FilterDrawerContent({ fields, filter, onFilterChange, onReset, onClear }: FilterDrawerContentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the fields based on search term
  const filteredFields = useMemo(() => {
    if (!searchTerm) return fields;
    const term = searchTerm.toLowerCase();
    return fields.filter((field) => field.title.toLowerCase().includes(term));
  }, [fields, searchTerm]);

  // Extract current filter values from the filter descriptor
  const getFilterValue = (field: string): string | BooleanFilterValue => {
    if (!filter || !filter.filters) return '';

    const filterDescriptor = filter.filters.find((f): f is FilterDescriptor => 'field' in f && f.field === field);

    if (!filterDescriptor) return '';

    const value = filterDescriptor.value;
    if (typeof value === 'boolean') {
      return value.toString() as BooleanFilterValue;
    }
    return value?.toString() || '';
  };

  // Update a specific filter field
  const updateFilter = (field: string, value: string, operator: string = 'contains') => {
    const currentFilters = filter?.filters || [];

    // Remove existing filter for this field
    const otherFilters = currentFilters.filter((f): f is FilterDescriptor => 'field' in f && f.field !== field);

    // Add new filter if value is not empty
    const newFilters: FilterDescriptor[] = [...otherFilters];
    if (value !== '') {
      let filterValue: string | boolean = value;
      let filterOperator = operator;

      // Handle boolean values
      if (value === 'true' || value === 'false') {
        filterValue = value === 'true';
        filterOperator = 'eq';
      }

      newFilters.push({
        field,
        operator: filterOperator,
        value: filterValue,
      });
    }

    onFilterChange({
      logic: 'and',
      filters: newFilters,
    });
  };

  const handleTextChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    updateFilter(field, e.target.value, 'contains');
  };

  const handleBooleanChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    updateFilter(field, e.target.value, 'eq');
  };

  const handleEnumChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    updateFilter(field, e.target.value, 'eq');
  };

  return (
    <div className="filter-drawer-container">
      {/* Filter action buttons */}
      <div className="filter-actions">
        <button onClick={onReset} className="filter-action-btn">
          Reset Filters
        </button>
        <button onClick={onClear} className="filter-action-btn">
          Clear Filters
        </button>
      </div>

      {/* Search box to filter the filters */}
      <div className="filter-search">
        <label htmlFor="filter-search-input">Search Filters:</label>
        <input
          id="filter-search-input"
          type="text"
          placeholder="Type to find a filter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-search-input"
        />
      </div>

      {/* Filter fields grid */}
      <div className="filter-fields-grid">
        {filteredFields.map((fieldDef) => {
          const isApplied = getFilterValue(fieldDef.field) !== '';
          const appliedDescId = `filter-${fieldDef.field}-applied`;
          return (
          <div key={fieldDef.field} className={`filter-field${isApplied ? ' filter-field--applied' : ''}`}>
            <label htmlFor={`filter-${fieldDef.field}`} className={`filter-label${isApplied ? ' filter-label--applied' : ''}`}>
              {fieldDef.title}
            </label>
            {isApplied && <span id={appliedDescId} className="sr-only">Filter applied</span>}

            {fieldDef.type === 'boolean' ? (
              <select
                id={`filter-${fieldDef.field}`}
                value={getFilterValue(fieldDef.field)}
                onChange={handleBooleanChange(fieldDef.field)}
                className="filter-input filter-select"
                aria-describedby={isApplied ? appliedDescId : undefined}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : fieldDef.type === 'enum' ? (
              <select
                id={`filter-${fieldDef.field}`}
                value={getFilterValue(fieldDef.field)}
                onChange={handleEnumChange(fieldDef.field)}
                className="filter-input filter-select"
                aria-describedby={isApplied ? appliedDescId : undefined}
              >
                <option value="">All</option>
                {fieldDef.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`filter-${fieldDef.field}`}
                type="text"
                value={getFilterValue(fieldDef.field)}
                onChange={handleTextChange(fieldDef.field)}
                placeholder={`Filter by ${fieldDef.title.toLowerCase()}...`}
                className="filter-input filter-text"
                aria-describedby={isApplied ? appliedDescId : undefined}
              />
            )}
          </div>
          );
        })}
      </div>

      {filteredFields.length === 0 && (
        <div className="no-filters-message">No filters match &quot;{searchTerm}&quot;</div>
      )}
    </div>
  );
}
