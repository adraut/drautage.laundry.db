import { useState, useCallback } from 'react';
import { registerLocale, getName } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Drawer } from '../Drawer';
import { ProductProfile } from './types/ProductProfile';
import { getIngredientCategories } from '../types/IngredientCategoryMap';

import './ProductDetailCard.css';

registerLocale(enLocale);

interface ProductDetailCardProps {
  product: ProductProfile | null;
  onClose: () => void;
}

export function ProductDetailCard({ product, onClose }: ProductDetailCardProps) {
  const [copied, setCopied] = useState(false);
  const countryNames = product?.countriesAvailable?.map((code) => getName(code, 'en') ?? code).join(', ') ?? '—';

  const handleCopyLink = useCallback(() => {
    if (!navigator.clipboard || !product) return;
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set('d', product.slug);
    void navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [product]);

  return (
    <Drawer
      isOpen={product !== null}
      onClose={onClose}
      title={`${product?.brand} ${product?.name ?? ''}`}
      side="right"
      headerActions={
        product && (
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
      {product && (
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
                {product.ingredients.map((ingredient) => {
                  const excluded = product.effectiveCategoryExclusions[ingredient] ?? [];
                  const added = product.effectiveCategoryAdditions.get(ingredient) ?? [];
                  const base = getIngredientCategories(ingredient);
                  const categories = [...new Set([...base, ...added])].filter((cat) => !excluded.includes(cat));
                  return (
                    <tr key={ingredient}>
                      <td>{ingredient}</td>
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
              <dd className="detail-meta-value">{product.lastUpdatedFormatted}</dd>
              <dt className="detail-meta-label">Data source</dt>
              <dd className="detail-meta-value">{product.dataSource}</dd>
            </dl>
          </div>
        </>
      )}
    </Drawer>
  );
}
