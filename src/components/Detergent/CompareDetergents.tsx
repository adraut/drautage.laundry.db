function CompareDetergents() {
  const detergents = [
    {
      name: 'Tide Original',
      type: 'Liquid',
      enzymes: 'Yes',
      fragrance: 'Strong',
      heCompatible: 'Yes',
      price: '$$',
    },
    {
      name: 'Persil ProClean',
      type: 'Powder',
      enzymes: 'Yes',
      fragrance: 'Medium',
      heCompatible: 'Yes',
      price: '$$$',
    },
    {
      name: 'Gain Original',
      type: 'Liquid',
      enzymes: 'Yes',
      fragrance: 'Strong',
      heCompatible: 'Yes',
      price: '$',
    },
  ];

  return (
    <div>
      <h1>Compare Detergents</h1>
      <p>Side-by-side comparison of popular laundry detergents.</p>

      <div className="comparison-container">
        {detergents.map((detergent, index) => (
          <div key={index} className="comparison-item">
            <h3>{detergent.name}</h3>
            <p><strong>Type:</strong> {detergent.type}</p>
            <p><strong>Enzymes:</strong> {detergent.enzymes}</p>
            <p><strong>Fragrance:</strong> {detergent.fragrance}</p>
            <p><strong>HE Compatible:</strong> {detergent.heCompatible}</p>
            <p><strong>Price Range:</strong> {detergent.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompareDetergents;
