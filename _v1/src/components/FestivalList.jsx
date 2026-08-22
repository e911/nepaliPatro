import { BS_MONTH_DATA } from '../data/bsMonthData';
import { BS_MONTH_NAMES, BS_MONTH_NAMES_NP, bsToAd, AD_MONTH_ABBR, DOW_NAMES, toNpDigits } from '../utils/dateConverter';
import { festivalsFor } from '../data/festivals';

export default function FestivalList({ viewYear, viewMonth }) {
  const daysInMonth = BS_MONTH_DATA[viewYear][viewMonth - 1];
  const items = [];
  for (let d = 1; d <= daysInMonth; d++) {
    festivalsFor(viewYear, viewMonth, d).forEach((f) => items.push({ d, ...f }));
  }

  return (
    <div className="fest-section">
      <h2>यस महिनाका पर्वहरू · Festivals this month</h2>
      {items.length === 0 ? (
        <div className="empty-note">
          No recorded festivals for {BS_MONTH_NAMES[viewMonth - 1]} {viewYear} yet. Fixed-date civic holidays (New
          Year, Constitution Day, etc.) are shown when this month falls outside BS 2082–2083.
        </div>
      ) : (
        <div className="fest-list">
          {items.map((it, i) => {
            const adUtc = bsToAd(viewYear, viewMonth, it.d);
            const adDate = new Date(adUtc);
            const dow = DOW_NAMES[adDate.getUTCDay()];
            return (
              <div className="fest-item" key={i}>
                <div className="fest-date-badge">
                  <b>{toNpDigits(it.d)}</b>
                  {BS_MONTH_NAMES_NP[viewMonth - 1]}
                </div>
                <div>
                  <div className="fest-name">{it.name}</div>
                  <div className="fest-sub">
                    {adDate.getUTCDate()} {AD_MONTH_ABBR[adDate.getUTCMonth()]} {adDate.getUTCFullYear()} · {dow}
                    {it.tag === 'major' ? ' · Major festival' : ''}
                    {it.tag === 'holiday' ? ' · Public holiday' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
