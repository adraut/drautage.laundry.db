import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navigation.css';

function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Laundry Product Database
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/detergents">Detergents</Link>
          </li>
          {/* <li>
            <Link to="/boosters">Boosters</Link>
          </li>
          <li>
            <Link to="/pretreaters">Pretreaters</Link>
          </li>
          <li>
            <Link to="/glossary">Glossary</Link>
          </li> */}
        </ul>
        <button
          className={`theme-toggle-btn ${theme === 'dark' ? 'theme-toggle-btn--sun' : 'theme-toggle-btn--moon'}`}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
