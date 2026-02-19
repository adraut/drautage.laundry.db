import { Link } from 'react-router-dom';

function Pretreaters() {
  const pretreaters = [
    {
      id: 1,
      name: 'Shout Advanced',
      type: 'Spray',
      description: 'Triple-acting formula for set-in stains.',
    },
    {
      id: 2,
      name: 'Zout Laundry Stain Remover',
      type: 'Spray',
      description: 'Enzyme-based formula for protein and oil-based stains.',
    },
    {
      id: 3,
      name: 'Fels-Naptha',
      type: 'Bar Soap',
      description: 'Traditional bar soap for tough stain pre-treatment.',
    },
  ];

  return (
    <div>
      <h1>Pretreaters</h1>
      <p>
        Find the best pretreaters for targeting stubborn stains before washing. These products help ensure your stains
        come out in the wash.
      </p>

      <Link to="/compare/pretreaters">
        <button style={{ marginTop: '1rem', marginBottom: '1rem' }}>Compare Pretreaters Side by Side</button>
      </Link>

      <div className="product-grid">
        {pretreaters.map((pretreater) => (
          <div key={pretreater.id} className="product-card">
            <h3>{pretreater.name}</h3>
            <p>
              <strong>Type:</strong> {pretreater.type}
            </p>
            <p>{pretreater.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pretreaters;
