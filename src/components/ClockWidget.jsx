import { useEffect, useRef, useState } from 'react';
import { nowInKathmandu } from '../utils/kathmanduTime';
import { DOW_NAMES } from '../utils/dateConverter';

const TICKS = Array.from({ length: 12 }, (_, i) => {
  const angle = ((i * 30) * Math.PI) / 180;
  const outer = 56;
  const inner = i % 3 === 0 ? 47 : 51;
  return {
    x1: (60 + outer * Math.sin(angle)).toFixed(1),
    y1: (60 - outer * Math.cos(angle)).toFixed(1),
    x2: (60 + inner * Math.sin(angle)).toFixed(1),
    y2: (60 - inner * Math.cos(angle)).toFixed(1),
  };
});

export default function ClockWidget() {
  const [time, setTime] = useState(nowInKathmandu());
  const raf = useRef(null);

  useEffect(() => {
    const tick = () => {
      setTime(nowInKathmandu());
      raf.current = setTimeout(tick, 1000);
    };
    tick();
    return () => clearTimeout(raf.current);
  }, []);

  const h = time.getUTCHours() % 12;
  const m = time.getUTCMinutes();
  const s = time.getUTCSeconds();
  const hourDeg = (h + m / 60) * 30;
  const minDeg = (m + s / 60) * 6;
  const secDeg = s * 6;

  const hh = String(time.getUTCHours()).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  const dateStr = `${DOW_NAMES[time.getUTCDay()]}, ${time.getUTCDate()} ${
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getUTCMonth()]
  } ${time.getUTCFullYear()}`;

  return (
    <div className="clock-widget" aria-label="Current time in Kathmandu">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="56" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        <g>
          {TICKS.map((t, i) => (
            <line key={i} className="clock-tick" x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
          ))}
        </g>
        <line className="clock-hand" x1="60" y1="60" x2="60" y2="36" stroke="var(--ink)" strokeWidth="4.5" transform={`rotate(${hourDeg} 60 60)`} />
        <line className="clock-hand" x1="60" y1="60" x2="60" y2="22" stroke="var(--ink)" strokeWidth="3" transform={`rotate(${minDeg} 60 60)`} />
        <line className="clock-hand" x1="60" y1="60" x2="60" y2="18" stroke="var(--crimson)" strokeWidth="1.5" transform={`rotate(${secDeg} 60 60)`} />
        <circle cx="60" cy="60" r="3.5" fill="var(--crimson)" />
      </svg>
      <div className="clock-digital">
        <div className="time">{hh}:{mm}:{ss}</div>
        <div className="sub">Kathmandu · NPT (UTC+5:45)</div>
        <div className="date">{dateStr}</div>
      </div>
    </div>
  );
}
