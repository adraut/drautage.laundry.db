import { registerLocale, getName } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Drawer } from '../common/Drawer';
import { DetergentProfile } from './types/DetergentProfile';
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
          <div className="detail-section">
            <h3 className="detail-section-title">Ingredients</h3>
            <table className="detail-table">
              <tbody>
                {detergent.ingredients.map((ingredient) => (
                  <tr key={ingredient}>
                    <td>{formatIngredient(ingredient)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="detail-section">
            <h3 className="detail-section-title">Details</h3>
            <dl className="detail-meta">
              <dt className="detail-meta-label">Countries</dt>
              <dd className="detail-meta-value">{countryNames}</dd>
              <dt className="detail-meta-label">Last updated</dt>
              <dd className="detail-meta-value">{detergent.lastUpdatedFormatted}</dd>
            </dl>
          </div>
        </>
      )}
    </Drawer>
  );
}
