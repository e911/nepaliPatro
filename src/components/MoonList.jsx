import { BS_MONTH_DATA } from '../data/bsMonthData';
import { BS_MONTH_NAMES_NP, bsToAd, AD_MONTH_ABBR, DOW_NAMES, toNpDigits } from '../utils/dateConverter';
import { findMoonDays } from '../utils/tithi';

export default function MoonList({ viewYear, viewMonth }) {
  const daysInMonth = BS_MONTH_DATA[viewYear][viewMonth - 1];
  const firstDayAdUtc = bsToAd(viewYear, viewMonth, 1);
  const moonDays = findMoonDays(daysInMonth, firstDayAdUtc);

  const items = [];
  if (moonDays.newMoonDay) items.push({ d: moonDays.newMoonDay, name: 'Amavasya (Aunsi) · New Moon' });
  if (moonDays.fullMoonDay) items.push({ d: moonDays.fullMoonDay, name: 'Purnima (Punhi) · Full Moon' });
  items.sort((a, b) => a.d - b.d);

  return (
    <div className="fest-section">
      <h2 className="moon-heading">पूर्णिमा · औंसी — Full &amp; New Moon this month</h2>
      {items.length === 0 ? (
        <div className="empty-note">No full or new moon lands within this month's range.</div>
      ) : (
        <div className="fest-list">
          {items.map((it) => {
            const adUtc = bsToAd(viewYear, viewMonth, it.d);
            const adDate = new Date(adUtc);
            const dow = DOW_NAMES[adDate.getUTCDay()];
            return (
              <div className="fest-item" key={it.name}>
                <div className="fest-date-badge moon">
                  <b>{toNpDigits(it.d)}</b>
                  {BS_MONTH_NAMES_NP[viewMonth - 1]}
                </div>
                <div>
                  <div className="fest-name">{it.name}</div>
                  <div className="fest-sub">
                    {adDate.getUTCDate()} {AD_MONTH_ABBR[adDate.getUTCMonth()]} {adDate.getUTCFullYear()} · {dow}
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
