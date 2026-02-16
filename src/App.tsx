import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import './App.css';
const Detergents = lazy(() => import('./components/Detergent/Detergents'));
const Boosters = lazy(() => import('./components/Booster/Boosters'));
const Pretreaters = lazy(() => import('./components/Pretreater/Pretreaters'));
const Glossary = lazy(() => import('./components/Glossary/Glossary'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detergents" element={<Detergents />} />
              <Route path="/boosters" element={<Boosters />} />
              <Route path="/pretreaters" element={<Pretreaters />} />
              <Route path="/glossary" element={<Glossary />} />
            </Routes>
          </main>
          <footer>
            <div>
              <object
                data="https://img.shields.io/github/release-date/adraut/drautage.laundry.db?display_date=published_at&cacheSeconds=86400&link=https://github.com/adraut/drautage.laundry.db/releases/"
                type="image/svg+xml"
              />
            </div>
          </footer>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
