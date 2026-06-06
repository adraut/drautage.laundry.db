import { useState, useCallback, useEffect, Fragment } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { DetergentProfile } from './types/DetergentProfile';
import { loadDetergents } from './data/detergents-data';
import { findDetergentBySlug } from './utils/detergentSlug';
import { buildCompareMatrix } from './utils/compareIngredients';
import './CompareView.css';

export function CompareView() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [allDetergents, setAllDetergents] = useState<Map<string, DetergentProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void loadDetergents()
      .then(setAllDetergents)
      .finally(() => setIsLoading(false));
  }, []);

  const slugs = searchParams.getAll('c');
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo;
  const backTo = returnTo ? `/detergents?${returnTo}` : '/detergents';

  const profiles = slugs
    .map((slug) => findDetergentBySlug(slug, allDetergents))
    .filter((p): p is DetergentProfile => p !== null);

  const handleCopyLink = useCallback(() => {
    if (!navigator.clipboard) return;
    void navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="compare-page">
        <div className="compare-toolbar">
          <Link to={backTo} className="compare-back-btn">
            ← Back to detergents
          </Link>
          <h1>Compare</h1>
        </div>
        <p className="compare-status">Loading…</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="compare-page">
        <div className="compare-toolbar">
          <Link to={backTo} className="compare-back-btn">
            ← Back to detergents
          </Link>
          <h1>Compare</h1>
        </div>
        <p className="compare-status">No products selected. Go back and select up to 3 products to compare.</p>
      </div>
    );
  }

  const matrix = buildCompareMatrix(profiles);
  const profileSlugs = profiles.map((p) => p.slug);

  return (
    <div className="compare-page">
      <div className="compare-toolbar">
        <Link to={backTo} className="compare-back-btn">
          ← Back to detergents
        </Link>
        <h1>Compare</h1>
        <button className="compare-copy-btn" onClick={handleCopyLink} title="Copy link to this comparison">
          {copied ? '✓' : '⎘'}
        </button>
      </div>

      <div className="compare-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-col-ingredient compare-col-header-corner">Ingredient</th>
              {profiles.map((p, i) => (
                <th key={profileSlugs[i]} className="compare-col-product">
                  <span className="compare-product-brand">{p.brand}</span>
                  <span className="compare-product-name">{p.name}</span>
                  <span className="compare-product-type">{p.type}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.groups.map((group) => (
              <Fragment key={group.display}>
                <tr className="compare-category-row">
                  <td colSpan={profiles.length + 1}>{group.display}</td>
                </tr>
                {group.ingredients.map(({ ingredient, functions }) => (
                  <tr key={`${group.display}-${ingredient}`}>
                    <td className="compare-col-ingredient">
                      <span className="compare-ingredient-name">{ingredient}</span>
                      {functions.length > 0 && <span className="compare-ingredient-fn">{functions.join(', ')}</span>}
                    </td>
                    {profileSlugs.map((slug) => (
                      <td key={slug} className="compare-cell">
                        {matrix.presence.get(ingredient)?.has(slug) ? (
                          <span className="compare-check" aria-label="present">
                            ✓
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}

            <tr className="compare-category-row">
              <td colSpan={profiles.length + 1}>Details</td>
            </tr>
            <tr>
              <td className="compare-col-ingredient">
                <span className="compare-ingredient-name">Data source</span>
              </td>
              {profiles.map((p, i) => (
                <td key={profileSlugs[i]} className="compare-cell compare-meta-cell">
                  {p.dataSource}
                </td>
              ))}
            </tr>
            <tr>
              <td className="compare-col-ingredient">
                <span className="compare-ingredient-name">Last updated</span>
              </td>
              {profiles.map((p, i) => (
                <td key={profileSlugs[i]} className="compare-cell compare-meta-cell">
                  {p.lastUpdatedFormatted}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareView;
