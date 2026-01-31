import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
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
          <li>
            <Link to="/boosters">Boosters</Link>
          </li>
          <li>
            <Link to="/pretreaters">Pretreaters</Link>
          </li>
          <li>
            <Link to="/glossary">Glossary</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
