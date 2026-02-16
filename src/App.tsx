import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home";
import Detergents from "./components/Detergent/Detergents";
import Boosters from "./components/Booster/Boosters";
import Pretreaters from "./components/Pretreater/Pretreaters";
import Glossary from "./components/Glossary/Glossary";
import "./App.css";

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
    </Router>
  );
}

export default App;
