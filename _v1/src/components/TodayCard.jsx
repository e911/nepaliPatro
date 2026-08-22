import { BS_MONTH_NAMES, BS_MONTH_NAMES_NP, DOW_NAMES, DOW_NAMES_NP, toNpDigits } from '../utils/dateConverter';
import { getTithi } from '../utils/tithi';
import { festivalsFor } from '../data/festivals';

export default function TodayCard({ todayBs, todayAdUtc }) {
  const adDate = new Date(todayAdUtc);
  const tithi = getTithi(todayAdUtc + 12 * 3600000);
  const fests = festivalsFor(todayBs.year, todayBs.month, todayBs.day);
  const dow = adDate.getUTCDay();

  return (
    <div className="today-card">
      <div className="today-left">
        <div className="today-num">{toNpDigits(todayBs.day)}</div>
        <div className="today-meta">
          <div className="np">
            {BS_MONTH_NAMES_NP[todayBs.month - 1]} {toNpDigits(todayBs.day)}, {toNpDigits(todayBs.year)} · {BS_MONTH_NAMES[todayBs.month - 1]} {todayBs.day}, {todayBs.year} BS
          </div>
          <div className="en">
            {adDate.getUTCFullYear()}-{String(adDate.getUTCMonth() + 1).padStart(2, '0')}-{String(adDate.getUTCDate()).padStart(2, '0')} AD
          </div>
          <div className="day">
            {DOW_NAMES[dow]} · {DOW_NAMES_NP[dow]}बार · {tithi.pakshaNp} पक्ष {tithi.nameNp}
          </div>
        </div>
      </div>
      {fests.length > 0 && <div className="today-fest">✺ {fests.map((f) => f.name).join(', ')}</div>}
    </div>
  );
}
