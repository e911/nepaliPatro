import { BS_MONTH_DATA } from '../data/bsMonthData';
import { bsToAd, AD_MONTH_ABBR, DOW_NAMES, toNpDigits } from '../utils/dateConverter';
import { getTithi, findMoonDays } from '../utils/tithi';
import { festivalsFor } from '../data/festivals';
import { isSait } from '../data/saitDates';

export default function CalendarGrid({ viewYear, viewMonth, todayBs }) {
  const daysInMonth = BS_MONTH_DATA[viewYear][viewMonth - 1];
  const firstDayAdUtc = bsToAd(viewYear, viewMonth, 1);
  const firstDow = new Date(firstDayAdUtc).getUTCDay();
  const moonDays = findMoonDays(daysInMonth, firstDayAdUtc);

  const cells = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push(<div key={`empty-${i}`} className="cell empty" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const adUtc = firstDayAdUtc + (d - 1) * 86400000;
    const adDate = new Date(adUtc);
    const dow = adDate.getUTCDay();
    const fests = festivalsFor(viewYear, viewMonth, d);
    const sait = isSait(viewYear, viewMonth, d);
    const isToday = viewYear === todayBs.year && viewMonth === todayBs.month && d === todayBs.day;
    const tithi = getTithi(adUtc + 12 * 3600000);

    const cls = ['cell'];
    if (dow === 6) cls.push('sat');
    if (fests.length) cls.push('has-fest');
    if (sait) cls.push('has-sait');
    if (isToday) cls.push('today');

    const titleParts = fests.map((f) => f.name).concat(sait ? ['Shubha Sait (auspicious wedding date)'] : []);
    titleParts.push(`${tithi.pakshaNp} पक्ष ${tithi.nameNp} · ${tithi.paksha} Paksha, ${tithi.name}`);

    cells.push(
      <div key={d} className={cls.join(' ')} title={titleParts.join(', ')}>
        <div className="bs-num">{toNpDigits(d)}</div>
        <div className="ad-sub">
          {adDate.getUTCDate()} {AD_MONTH_ABBR[adDate.getUTCMonth()]}
        </div>
        <div className="tithi-label">{tithi.nameNp}</div>
        {fests.length > 0 && (
          <>
            <div className="fest-dot" />
            <div className="fest-label">{fests[0].name.split('·')[0].trim()}</div>
          </>
        )}
        {sait && <div className="sait-dot" title="Auspicious wedding date" />}
        {d === moonDays.fullMoonDay && <div className="moon-icon full" title="Purnima (Full Moon)" />}
        {d === moonDays.newMoonDay && <div className="moon-icon new" title="Amavasya (New Moon)" />}
      </div>
    );
  }

  return (
    <div className="grid-wrap">
      <div className="dow-row">
        {DOW_NAMES.map((n, i) => (
          <div key={n} className={`dow ${i === 6 ? 'sat' : ''}`}>{n}</div>
        ))}
      </div>
      <div className="day-grid">{cells}</div>
      <div className="legend">
        <span><i className="lg-dot lg-fest" />Festival / holiday</span>
        <span><i className="lg-dot lg-sait" />Auspicious wedding date</span>
        <span><i className="lg-dot lg-full" />Purnima (full moon)</span>
        <span><i className="lg-dot lg-new" />Amavasya (new moon)</span>
        <span className="lg-tithi">Small green text = tithi (lunar day)</span>
      </div>
    </div>
  );
}
