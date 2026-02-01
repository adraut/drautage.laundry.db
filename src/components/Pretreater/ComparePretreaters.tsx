function ComparePretreaters() {
  const pretreaters = [
    {
      name: 'Shout Advanced',
      type: 'Spray',
      stainTypes: 'Oil, Protein, Grass',
      application: 'Spray-on',
      waitTime: '1-5 minutes',
      price: '$$',
    },
    {
      name: 'Zout Laundry Stain Remover',
      type: 'Spray',
      stainTypes: 'Protein, Oil',
      application: 'Spray-on',
      waitTime: '5-10 minutes',
      price: '$$$',
    },
    {
      name: 'Fels-Naptha',
      type: 'Bar Soap',
      stainTypes: 'General, Grease',
      application: 'Rub-on',
      waitTime: 'Immediate',
      price: '$',
    },
  ];

  return (
    <div>
      <h1>Compare Pretreaters</h1>
      <p>Side-by-side comparison of popular laundry pretreaters.</p>

      <div className="comparison-container">
        {pretreaters.map((pretreater, index) => (
          <div key={index} className="comparison-item">
            <h3>{pretreater.name}</h3>
            <p><strong>Type:</strong> {pretreater.type}</p>
            <p><strong>Stain Types:</strong> {pretreater.stainTypes}</p>
            <p><strong>Application:</strong> {pretreater.application}</p>
            <p><strong>Wait Time:</strong> {pretreater.waitTime}</p>
            <p><strong>Price Range:</strong> {pretreater.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparePretreaters;
