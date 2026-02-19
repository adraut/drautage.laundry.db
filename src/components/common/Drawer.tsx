import { useEffect, ReactNode } from 'react';
import './Drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

/**
 * A simple drawer component that slides in from the left side of the screen
 */
export function Drawer({ isOpen, onClose, children, title }: DrawerProps) {
  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && <div className="drawer-backdrop" onClick={onClose} role="presentation" />}

      {/* Drawer panel */}
      <div
        className={`drawer ${isOpen ? 'drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        <div className="drawer-header">
          {title && <h2 id="drawer-title">{title}</h2>}
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close drawer">
            ✕
          </button>
        </div>
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
}
