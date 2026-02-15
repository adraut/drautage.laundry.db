import { useState, useMemo, ChangeEvent } from 'react';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import './FilterDrawer.css';

interface FilterField {
  field: string;
  title: string;
  type: 'text' | 'boolean' | 'date';
}

interface FilterDrawerContentProps {
  fields: FilterField[];
  filter: CompositeFilterDescriptor | null;
  onFilterChange: (filter: CompositeFilterDescriptor) => void;
}

type BooleanFilterValue = 'true' | 'false' | '';

/**
 * Content component for the filter drawer
 * Provides filter inputs for all grid columns with search functionality
 */
export function FilterDrawerContent({ fields, filter, onFilterChange }: FilterDrawerContentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the fields based on search term
  const filteredFields = useMemo(() => {
    if (!searchTerm) return fields;
    const term = searchTerm.toLowerCase();
    return fields.filter(field => field.title.toLowerCase().includes(term));
  }, [fields, searchTerm]);

  // Extract current filter values from the filter descriptor
  const getFilterValue = (field: string): string | BooleanFilterValue => {
    if (!filter || !filter.filters) return '';
    
    const filterDescriptor = filter.filters.find(
      (f): f is FilterDescriptor => 'field' in f && f.field === field
    );
    
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
    const otherFilters = currentFilters.filter(
      (f): f is FilterDescriptor => 'field' in f && f.field !== field
    );

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

  return (
    <div className="filter-drawer-container">
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
        {filteredFields.map((fieldDef) => (
          <div key={fieldDef.field} className="filter-field">
            <label htmlFor={`filter-${fieldDef.field}`} className="filter-label">
              {fieldDef.title}
            </label>
            
            {fieldDef.type === 'boolean' ? (
              <select
                id={`filter-${fieldDef.field}`}
                value={getFilterValue(fieldDef.field)}
                onChange={handleBooleanChange(fieldDef.field)}
                className="filter-input filter-select"
              >
                <option value="">Unknown</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : (
              <input
                id={`filter-${fieldDef.field}`}
                type="text"
                value={getFilterValue(fieldDef.field)}
                onChange={handleTextChange(fieldDef.field)}
                placeholder={`Filter by ${fieldDef.title.toLowerCase()}...`}
                className="filter-input filter-text"
              />
            )}
          </div>
        ))}
      </div>

      {filteredFields.length === 0 && (
        <div className="no-filters-message">
          No filters match &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  );
}
