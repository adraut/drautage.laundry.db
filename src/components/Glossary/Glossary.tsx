function Glossary() {
  const terms = [
    {
      term: 'Enzymes',
      definition: 'Biological catalysts that break down specific types of stains like proteins, starches, and fats.',
    },
    {
      term: 'Surfactants',
      definition:
        'Surface-active agents that reduce surface tension, allowing water to better penetrate fabrics and remove dirt.',
    },
    {
      term: 'Optical Brighteners',
      definition:
        'Fluorescent compounds that absorb UV light and emit blue light, making fabrics appear whiter and brighter.',
    },
    {
      term: 'pH Level',
      definition:
        'Measure of acidity or alkalinity. Most laundry detergents are slightly alkaline (pH 8-10) for better cleaning.',
    },
    {
      term: 'Hard Water',
      definition: 'Water with high mineral content (calcium and magnesium) that can reduce detergent effectiveness.',
    },
    {
      term: 'HE (High Efficiency)',
      definition:
        'Detergents formulated for high-efficiency washing machines that use less water and require low-sudsing formulas.',
    },
  ];

  return (
    <div>
      <h1>Glossary</h1>
      <p>
        Learn about common laundry terms, ingredients, and concepts. Understanding these terms will help you make better
        decisions about your laundry care.
      </p>

      <div className="glossary-list">
        {terms.map((item, index) => (
          <div key={index} className="glossary-item">
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Glossary;
