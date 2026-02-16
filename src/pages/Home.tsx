import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Laundry Product Database</h1>
      <p>
        Your comprehensive resource for information about laundry detergents, boosters, pretreaters, and more. Browse
        our database to find the perfect products for your laundry needs.
      </p>

      <div className="product-grid">
        <div className="product-card">
          <h3>Detergents</h3>
          <p>Explore laundry detergents to find the right formula for your fabrics and cleaning needs.</p>
          <Link to="/detergents">
            <button style={{ marginTop: '1rem' }}>View Detergents</button>
          </Link>
        </div>

        {/* <div className="product-card">
          <h3>Boosters</h3>
          <p>
            Discover laundry boosters that enhance your wash and provide extra cleaning 
            power for tough stains.
          </p>
          <Link to="/boosters">
            <button style={{ marginTop: '1rem' }}>View Boosters</button>
          </Link>
        </div>

        <div className="product-card">
          <h3>Pretreaters</h3>
          <p>
            Find the best pretreaters for targeting stubborn stains before washing.
          </p>
          <Link to="/pretreaters">
            <button style={{ marginTop: '1rem' }}>View Pretreaters</button>
          </Link>
        </div>

        <div className="product-card">
          <h3>Glossary</h3>
          <p>
            Learn about laundry terms, ingredients, and concepts in our comprehensive 
            glossary.
          </p>
          <Link to="/glossary">
            <button style={{ marginTop: '1rem' }}>View Glossary</button>
          </Link>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default Home;
