import { BS_MONTH_NAMES, BS_MONTH_NAMES_NP, bsToAd, AD_MONTH_ABBR, DOW_NAMES, toNpDigits } from '../utils/dateConverter';
import { SAIT_DATES } from '../data/saitDates';

export default function SaitList({ viewYear, viewMonth }) {
  const days = SAIT_DATES[viewYear] && SAIT_DATES[viewYear][viewMonth];

  return (
    <div className="fest-section">
      <h2 className="sait-heading">शुभ बिबाह साइत · Auspicious wedding dates this month</h2>
      {!days ? (
        <div className="empty-note">
          {viewYear === 2083
            ? `No auspicious wedding dates fall in ${BS_MONTH_NAMES[viewMonth - 1]} ${viewYear} — this month sits in a fasting or festival-heavy stretch traditionally considered unsuitable for weddings.`
            : 'Verified Shubha Sait (wedding muhurat) dates from the Panchang Nirnayak Samiti are currently only available for BS 2083 (AD 2026–27). Other years aren\'t published yet.'}
        </div>
      ) : (
        <div className="fest-list">
          {days.map((d) => {
            const adUtc = bsToAd(viewYear, viewMonth, d);
            const adDate = new Date(adUtc);
            const dow = DOW_NAMES[adDate.getUTCDay()];
            return (
              <div className="fest-item" key={d}>
                <div className="fest-date-badge sait">
                  <b>{toNpDigits(d)}</b>
                  {BS_MONTH_NAMES_NP[viewMonth - 1]}
                </div>
                <div>
                  <div className="fest-name">Shubha Bibaha Sait</div>
                  <div className="fest-sub">
                    {adDate.getUTCDate()} {AD_MONTH_ABBR[adDate.getUTCMonth()]} {adDate.getUTCFullYear()} · {dow} · Auspicious for weddings
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
