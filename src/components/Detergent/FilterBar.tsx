import React from 'react';
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className="filter-bar" 
      onClick={onClick} 
      onKeyDown={handleKeyDown}
      role="button" 
      tabIndex={0}
      aria-label="Open filters"
    >
      <div className="filter-bar-icon">⏵</div>
      <div className="filter-bar-text">FILTERS</div>
    </div>
  );
}
