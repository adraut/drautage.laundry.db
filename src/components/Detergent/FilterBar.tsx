import './FilterBar.css';

interface FilterBarProps {
  onClick: () => void;
  isVisible: boolean;
}

/**
 * Vertical filter bar that appears on the left side of the screen
 * Shows a funnel icon and "Filters" text vertically
 */
export function FilterBar({ onClick, isVisible }: FilterBarProps) {
  if (!isVisible) return null;

  return (
    <div className="filter-bar" onClick={onClick} role="button" tabIndex={0}>
      <div className="filter-bar-icon">⏵</div>
      <div className="filter-bar-text">FILTERS</div>
    </div>
  );
}
