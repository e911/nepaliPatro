import { useState, useMemo } from 'react';
import './App.css';
import { adToBs } from './utils/dateConverter';
import { kathmanduTodayUtcMidnight } from './utils/kathmanduTime';
import { BS_MIN_YEAR, BS_MAX_YEAR } from './data/bsMonthData';

import ClockWidget from './components/ClockWidget';
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
      <div className="band" />

      <header>
        <div>
          <div className="eyebrow">बिक्रम संवत् · Bikram Sambat</div>
          <h1>नेपाली <span>पात्रो</span></h1>
          <div className="subtitle">
            पर्व, सार्वजनिक बिदा, शुभ साइत, तिथि र चन्द्रकला — हरेक गतेमुनि अङ्ग्रेजी मिति सहित।
          </div>
        </div>
        <ClockWidget />
      </header>

      <MonthControls
        viewYear={viewYear}
        viewMonth={viewMonth}
        onMonthChange={setViewMonth}
        onYearChange={setViewYear}
        onShift={shiftMonth}
        onJumpToday={() => { setViewYear(todayBs.year); setViewMonth(todayBs.month); }}
      />

      <div className="layout">
        <div className="main-col" id="calendar">
          <CalendarGrid viewYear={viewYear} viewMonth={viewMonth} todayBs={todayBs} />
        </div>

        <div className="side-col">
          <div id="today">
            <TodayCard todayBs={todayBs} todayAdUtc={todayAdUtc} />
          </div>
          <div id="festivals">
            <FestivalList viewYear={viewYear} viewMonth={viewMonth} />
            <MoonList viewYear={viewYear} viewMonth={viewMonth} />
            <SaitList viewYear={viewYear} viewMonth={viewMonth} />
          </div>
          <div id="converter">
            <DateConverter todayBs={todayBs} todayAdUtc={todayAdUtc} />
          </div>
        </div>
      </div>

      <footer>
        मिति रूपान्तरण नेपाल सरकारको आधिकारिक बिक्रम संवत् महिना-दिन तालिका (BS २०००–२०९९ · AD 1943–2043) बाट गणना
        गरिएको हो। पर्व र बिदाका मिति गृह मन्त्रालयको बिदा सूचना अनुसार, नेपाल पञ्चाङ्ग निर्णायक समितिको प्रकाशित तिथि
        पात्रोसँग दिन-प्रतिदिन मिलाइएको। शुभ साइत नेपाल पञ्चाङ्ग निर्णायक समितिको बि.सं. २०८३ को सूची अनुसार। तिथि,
        पूर्णिमा र औंसी मध्य चान्द्र मासबाट गणना गरिएका — पूजाको सटीक साइतका लागि पूर्ण पञ्चाङ्ग हेर्नुहोस्।
      </footer>

      <div className="band" />

      <nav className="mobile-nav">
        <a href="#calendar" className="active"><span className="icon">▦</span><span className="label">पात्रो</span></a>
        <a href="#festivals"><span className="icon">◈</span><span className="label">पर्व</span></a>
        <a href="#today"><span className="icon">◐</span><span className="label">तिथि</span></a>
        <a href="#converter"><span className="icon">⇄</span><span className="label">परिवर्तन</span></a>
      </nav>
    </div>
  );
}
