import { BS_MONTH_NAMES, BS_MONTH_NAMES_NP, toNpDigits } from '../utils/dateConverter';
import { BS_MIN_YEAR, BS_MAX_YEAR } from '../data/bsMonthData';

export default function MonthControls({ viewYear, viewMonth, onMonthChange, onYearChange, onShift, onJumpToday }) {
  const years = [];
  for (let y = BS_MIN_YEAR; y <= BS_MAX_YEAR; y++) years.push(y);

  return (
    <>
      <div className="controls">
        <button className="nav-btn" aria-label="Previous month" onClick={() => onShift(-1)}>‹</button>
        <div className="month-label">
          {BS_MONTH_NAMES[viewMonth - 1]} {viewYear}
          <small>
            {BS_MONTH_NAMES_NP[viewMonth - 1]} — {toNpDigits(viewYear)} बि.सं.
          </small>
        </div>
        <button className="nav-btn" aria-label="Next month" onClick={() => onShift(1)}>›</button>
      </div>
      <div className="controls" style={{ marginTop: 10 }}>
        <div className="selects">
          <select value={viewMonth} onChange={(e) => onMonthChange(+e.target.value)}>
            {BS_MONTH_NAMES.map((n, i) => (
              <option key={n} value={i + 1}>{n}</option>
            ))}
          </select>
          <select value={viewYear} onChange={(e) => onYearChange(+e.target.value)}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button className="today-jump" onClick={onJumpToday}>आज · Jump to today</button>
      </div>
    </>
  );
}
