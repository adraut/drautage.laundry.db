import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import Detergents from './pages/Detergents';
import Boosters from './pages/Boosters';
import Pretreaters from './pages/Pretreaters';
import Glossary from './pages/Glossary';
import CompareDetergents from './pages/CompareDetergents';
import CompareBoosters from './pages/CompareBoosters';
import ComparePretreaters from './pages/ComparePretreaters';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detergents" element={<Detergents />} />
            <Route path="/boosters" element={<Boosters />} />
            <Route path="/pretreaters" element={<Pretreaters />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/compare/detergents" element={<CompareDetergents />} />
            <Route path="/compare/boosters" element={<CompareBoosters />} />
            <Route path="/compare/pretreaters" element={<ComparePretreaters />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
