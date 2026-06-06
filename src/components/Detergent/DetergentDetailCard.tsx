import { useState, useCallback } from 'react';
import { registerLocale, getName } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Drawer } from '../common/Drawer';
import { DetergentProfile } from './types/DetergentProfile';
import { getIngredientCategories } from '../common/types/IngredientCategoryMap';

import './DetergentDetailCard.css';

registerLocale(enLocale);

interface DetergentDetailCardProps {
  detergent: DetergentProfile | null;
  onClose: () => void;
}

function formatIngredient(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

export function DetergentDetailCard({ detergent, onClose }: DetergentDetailCardProps) {
  const [copied, setCopied] = useState(false);
  const countryNames = detergent?.countriesAvailable?.map((code) => getName(code, 'en') ?? code).join(', ') ?? '—';

  const handleCopyLink = useCallback(() => {
    if (!navigator.clipboard || !detergent) return;
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set('d', detergent.slug);
    void navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [detergent]);

  return (
    <Drawer
      isOpen={detergent !== null}
      onClose={onClose}
      title={`${detergent?.brand} ${detergent?.name ?? ''}`}
      side="right"
      headerActions={
        detergent && (
          <button
            className="detail-copy-link-btn"
            onClick={handleCopyLink}
            aria-label="Copy link to this product"
            title="Copy link"
          >
            {copied ? '✓' : '⎘'}
          </button>
        )
      }
    >
      {detergent && (
        <>
          <div id="ingredients-section" className="detail-section">
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                {detergent.ingredients.map((ingredient) => {
                  const excluded = detergent.effectiveCategoryExclusions[ingredient] ?? [];
                  const categories = getIngredientCategories(ingredient).filter((cat) => !excluded.includes(cat));
                  return (
                    <tr key={ingredient}>
                      <td>{formatIngredient(ingredient)}</td>
                      <td>{categories.length > 0 ? categories.join(', ') : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div id="details-section" className="detail-section">
            <div style={{ marginBottom: '1em' }}>
              <hr />
            </div>
            <dl className="detail-meta">
              <dt className="detail-meta-label">Countries</dt>
              <dd className="detail-meta-value">{countryNames}</dd>
              <dt className="detail-meta-label">Last updated</dt>
              <dd className="detail-meta-value">{detergent.lastUpdatedFormatted}</dd>
              <dt className="detail-meta-label">Data source</dt>
              <dd className="detail-meta-value">{detergent.dataSource}</dd>
            </dl>
          </div>
        </>
      )}
    </Drawer>
  );
}
