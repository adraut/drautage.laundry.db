import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterDrawerContent } from '../FilterDrawerContent';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

const mockFields = [
  { field: 'name', title: 'Product Name', type: 'text' as const },
  { field: 'brand', title: 'Brand', type: 'text' as const },
  { field: 'hasProtease', title: 'Protease', type: 'boolean' as const },
  { field: 'hasAmylase', title: 'Amylase', type: 'boolean' as const },
];

describe('FilterDrawerContent', () => {
  it('should render all filter fields', () => {
    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand')).toBeInTheDocument();
    expect(screen.getByLabelText('Protease')).toBeInTheDocument();
    expect(screen.getByLabelText('Amylase')).toBeInTheDocument();
  });

  it('should render text inputs for text fields', () => {
    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText('Product Name');
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toHaveAttribute('placeholder', 'Filter by product name...');
  });

  it('should render select dropdowns for boolean fields', () => {
    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const proteaseSelect = screen.getByLabelText('Protease');
    expect(proteaseSelect.tagName).toBe('SELECT');

    // Check for Yes/No/All options (multiple boolean fields exist, so use getAllByRole)
    expect(screen.getAllByRole('option', { name: 'All' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('option', { name: 'Yes' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('option', { name: 'No' }).length).toBeGreaterThan(0);
  });

  it('should display current filter values for text fields', () => {
    const filter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'name', operator: 'contains', value: 'Tide' }],
    };

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={filter}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText('Product Name') as HTMLInputElement;
    expect(nameInput.value).toBe('Tide');
  });

  it('should display current filter values for boolean fields', () => {
    const filter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'hasProtease', operator: 'eq', value: true }],
    };

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={filter}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const proteaseSelect = screen.getByLabelText('Protease') as HTMLSelectElement;
    expect(proteaseSelect.value).toBe('true');
  });

  it('should call onFilterChange when text input changes', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText('Product Name');
    await user.type(nameInput, 'T');

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.filters).toContainEqual({
      field: 'name',
      operator: 'contains',
      value: 'T',
    });
  });

  it('should call onFilterChange when boolean select changes', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const proteaseSelect = screen.getByLabelText('Protease');
    await user.selectOptions(proteaseSelect, 'true');

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.filters).toContainEqual({
      field: 'hasProtease',
      operator: 'eq',
      value: true,
    });
  });

  it('should filter fields based on search term', async () => {
    const user = userEvent.setup();

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const searchInput = screen.getByLabelText('Search Filters:');
    await user.type(searchInput, 'prot');

    // Protease should be visible
    expect(screen.getByLabelText('Protease')).toBeInTheDocument();

    // Other fields should not be visible
    expect(screen.queryByLabelText('Amylase')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Brand')).not.toBeInTheDocument();
  });

  it('should show "no filters" message when search has no results', async () => {
    const user = userEvent.setup();

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const searchInput = screen.getByLabelText('Search Filters:');
    await user.type(searchInput, 'zzzzz');

    expect(screen.getByText(/No filters match "zzzzz"/)).toBeInTheDocument();
  });

  it('should remove filter when text input is cleared', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();

    const filter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [
        { field: 'name', operator: 'contains', value: 'Tide' },
        { field: 'brand', operator: 'contains', value: 'P&G' },
      ],
    };

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={filter}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText('Product Name');
    await user.clear(nameInput);

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    // Should only have the brand filter now
    expect(lastCall.filters.length).toBe(1);
    expect(lastCall.filters).toContainEqual({
      field: 'brand',
      operator: 'contains',
      value: 'P&G',
    });
  });

  it('should remove filter when boolean select is set to Unknown', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();

    const filter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [
        { field: 'hasProtease', operator: 'eq', value: true },
        { field: 'hasAmylase', operator: 'eq', value: false },
      ],
    };

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={filter}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const proteaseSelect = screen.getByLabelText('Protease');
    await user.selectOptions(proteaseSelect, '');

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    // Should only have the amylase filter now
    expect(lastCall.filters.length).toBe(1);
    expect(lastCall.filters).toContainEqual({
      field: 'hasAmylase',
      operator: 'eq',
      value: false,
    });
  });

  it('should use "and" logic for combining filters', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();

    render(
      <FilterDrawerContent
        fields={mockFields}
        filter={null}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText('Product Name');
    await user.type(nameInput, 'Tide');

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.logic).toBe('and');
  });

  it('should render select dropdown for enum fields', () => {
    const enumFields = [
      {
        field: 'type',
        title: 'Type',
        type: 'enum' as const,
        options: ['Liquid', 'Powder', 'Pod'],
      },
    ];

    render(
      <FilterDrawerContent
        fields={enumFields}
        filter={null}
        onFilterChange={() => {}}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const typeSelect = screen.getByLabelText('Type');
    expect(typeSelect.tagName).toBe('SELECT');

    // Should have "All" option plus all enum options
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Liquid' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Powder' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Pod' })).toBeInTheDocument();
  });

  it('should filter by enum field selection', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();
    const enumFields = [
      {
        field: 'type',
        title: 'Type',
        type: 'enum' as const,
        options: ['Liquid', 'Powder', 'Pod'],
      },
    ];

    render(
      <FilterDrawerContent
        fields={enumFields}
        filter={null}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const typeSelect = screen.getByLabelText('Type');
    await user.selectOptions(typeSelect, 'Powder');

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.filters).toContainEqual({
      field: 'type',
      operator: 'eq',
      value: 'Powder',
    });
  });

  it('should clear enum filter when "All" is selected', async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();
    const enumFields = [
      {
        field: 'type',
        title: 'Type',
        type: 'enum' as const,
        options: ['Liquid', 'Powder', 'Pod'],
      },
    ];

    const initialFilter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'type', operator: 'eq', value: 'Liquid' }],
    };

    render(
      <FilterDrawerContent
        fields={enumFields}
        filter={initialFilter}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        onClear={() => {}}
      />,
    );

    const typeSelect = screen.getByLabelText('Type');
    await user.selectOptions(typeSelect, '');

    expect(onFilterChange).toHaveBeenCalled();
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.filters.length).toBe(0);
  });
});
