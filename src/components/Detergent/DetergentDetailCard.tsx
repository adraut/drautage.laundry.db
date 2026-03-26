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
  const countryNames = detergent?.countriesAvailable?.map((code) => getName(code, 'en') ?? code).join(', ') ?? '—';

  return (
    <Drawer
      isOpen={detergent !== null}
      onClose={onClose}
      title={`${detergent?.brand} ${detergent?.name ?? ''}`}
      side="right"
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
                  const categories = getIngredientCategories(ingredient);
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
