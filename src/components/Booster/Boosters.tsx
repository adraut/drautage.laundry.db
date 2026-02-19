import { Link } from 'react-router-dom';

function Boosters() {
  const boosters = [
    {
      id: 1,
      name: 'OxiClean Versatile',
      type: 'Powder',
      description: 'Oxygen-based booster that enhances stain removal and brightening.',
    },
    {
      id: 2,
      name: 'Borax',
      type: 'Powder',
      description: 'Natural mineral that boosts cleaning power and deodorizes.',
    },
    {
      id: 3,
      name: 'Biz Stain Fighter',
      type: 'Powder',
      description: 'Enzyme-based booster for tough stain removal.',
    },
  ];

  return (
    <div>
      <h1>Boosters</h1>
      <p>
        Discover laundry boosters that enhance your regular detergent's cleaning power. These products help tackle tough
        stains and brighten your laundry.
      </p>

      <Link to="/compare/boosters">
        <button style={{ marginTop: '1rem', marginBottom: '1rem' }}>Compare Boosters Side by Side</button>
      </Link>

      <div className="product-grid">
        {boosters.map((booster) => (
          <div key={booster.id} className="product-card">
            <h3>{booster.name}</h3>
            <p>
              <strong>Type:</strong> {booster.type}
            </p>
            <p>{booster.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boosters;
