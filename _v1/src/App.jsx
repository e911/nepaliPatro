import { useState, useMemo } from 'react';
import './App.css';
import { adToBs } from './utils/dateConverter';
import { kathmanduTodayUtcMidnight } from './utils/kathmanduTime';
import { BS_MIN_YEAR, BS_MAX_YEAR } from './data/bsMonthData';

import ClockWidget from './components/ClockWidget';
import Toran from './components/Toran';
import TodayCard from './components/TodayCard';
import MonthControls from './components/MonthControls';
import CalendarGrid from './components/CalendarGrid';
import FestivalList from './components/FestivalList';
import SaitList from './components/SaitList';
import MoonList from './components/MoonList';
import DateConverter from './components/DateConverter';

export default function App() {
  // "Today" is anchored to Kathmandu's current date, since that's the
  // calendar's own reference point -- a visitor in another timezone should
  // still see the date that's actually "today" in Nepal.
  const todayAdUtc = useMemo(() => kathmanduTodayUtcMidnight(), []);
  const todayBs = useMemo(() => adToBs(todayAdUtc), [todayAdUtc]);

  const [viewYear, setViewYear] = useState(todayBs.year);
  const [viewMonth, setViewMonth] = useState(todayBs.month);

  function shiftMonth(delta) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m > 12) { m = 1; y++; }
    if (m < 1) { m = 12; y--; }
    y = Math.min(Math.max(y, BS_MIN_YEAR), BS_MAX_YEAR);
    setViewYear(y);
    setViewMonth(m);
  }

  return (
    <div className="wrap">
      <ClockWidget />

      <header>
        <div className="eyebrow">बिक्रम संवत् · Bikram Sambat</div>
        <div className="title-row">
          <h1>
            नेपाली <span>पात्रो</span>
          </h1>
          <div className="subtitle">
            Full Nepali date, festival &amp; holiday calendar — with the matching Gregorian (English) date set as a
            small subscript under every day.
          </div>
        </div>
        <Toran />
      </header>

      <TodayCard todayBs={todayBs} todayAdUtc={todayAdUtc} />

      <MonthControls
        viewYear={viewYear}
        viewMonth={viewMonth}
        onMonthChange={setViewMonth}
        onYearChange={setViewYear}
        onShift={shiftMonth}
        onJumpToday={() => { setViewYear(todayBs.year); setViewMonth(todayBs.month); }}
      />

      <CalendarGrid viewYear={viewYear} viewMonth={viewMonth} todayBs={todayBs} />

      <FestivalList viewYear={viewYear} viewMonth={viewMonth} />
      <SaitList viewYear={viewYear} viewMonth={viewMonth} />
      <MoonList viewYear={viewYear} viewMonth={viewMonth} />

      <DateConverter todayBs={todayBs} todayAdUtc={todayAdUtc} />

      <footer>
        Conversion is computed from Nepal's official Bikram Sambat month-length data (BS 2000–2099 · AD 1943–2043).
        Festival dates for BS 2082–2083 (AD 2025–2027) follow the Government of Nepal, Ministry of Home Affairs
        holiday gazette, cross-checked day-by-day against the published Nepal Panchang Nirnayak Samiti tithi
        calendar; movable lunar festivals outside that range are not yet published by the government and are shown
        only where fixed by BS date. Auspicious wedding (Shubha Sait) dates follow the Nepal Panchang Nirnayak
        Samiti listing for BS 2083 — the samiti has not yet published sait dates for other years. Purnima, Amavasya,
        and the daily tithi shown on each date are computed from the mean synodic lunar month, not a full panchang —
        expect occasional ±0.5–1 day drift from the traditional tithi used for exact puja timing.
      </footer>
    </div>
  );
}
