function CompareBoosters() {
  const boosters = [
    {
      name: 'OxiClean Versatile',
      type: 'Powder',
      activeIngredient: 'Sodium Percarbonate',
      colorSafe: 'Yes',
      usesPerContainer: '~50',
      price: '$$',
    },
    {
      name: 'Borax',
      type: 'Powder',
      activeIngredient: 'Sodium Tetraborate',
      colorSafe: 'Yes',
      usesPerContainer: '~100',
      price: '$',
    },
    {
      name: 'Biz Stain Fighter',
      type: 'Powder',
      activeIngredient: 'Enzymes',
      colorSafe: 'Yes',
      usesPerContainer: '~60',
      price: '$$',
    },
  ];

  return (
    <div>
      <h1>Compare Boosters</h1>
      <p>Side-by-side comparison of popular laundry boosters.</p>

      <div className="comparison-container">
        {boosters.map((booster, index) => (
          <div key={index} className="comparison-item">
            <h3>{booster.name}</h3>
            <p>
              <strong>Type:</strong> {booster.type}
            </p>
            <p>
              <strong>Active Ingredient:</strong> {booster.activeIngredient}
            </p>
            <p>
              <strong>Color Safe:</strong> {booster.colorSafe}
            </p>
            <p>
              <strong>Uses Per Container:</strong> {booster.usesPerContainer}
            </p>
            <p>
              <strong>Price Range:</strong> {booster.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompareBoosters;
