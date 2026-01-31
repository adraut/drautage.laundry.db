import { Link } from 'react-router-dom';

function Detergents() {
  const detergents = [
    {
      id: 1,
      name: 'Tide Original',
      type: 'Liquid',
      description: 'A powerful cleaning formula for everyday laundry needs.',
    },
    {
      id: 2,
      name: 'Persil ProClean',
      type: 'Powder',
      description: 'Deep cleaning power with stain-fighting enzymes.',
    },
    {
      id: 3,
      name: 'Gain Original',
      type: 'Liquid',
      description: 'Fresh scent with effective stain removal.',
    },
  ];

  return (
    <div>
      <h1>Detergents</h1>
      <p>
        Browse our collection of laundry detergents. Each product is designed to provide 
        effective cleaning for various fabric types and laundry needs.
      </p>
      
      <Link to="/compare/detergents">
        <button style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Compare Detergents Side by Side
        </button>
      </Link>

      <div className="product-grid">
        {detergents.map((detergent) => (
          <div key={detergent.id} className="product-card">
            <h3>{detergent.name}</h3>
            <p><strong>Type:</strong> {detergent.type}</p>
            <p>{detergent.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detergents;
