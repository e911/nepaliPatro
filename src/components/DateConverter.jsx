import { useState } from 'react';
import { BS_MONTH_DATA, BS_MIN_YEAR, BS_MAX_YEAR } from '../data/bsMonthData';
import { bsToAd, adToBs, BS_MONTH_NAMES, AD_MONTH_ABBR, DOW_NAMES } from '../utils/dateConverter';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function DateConverter({ todayBs, todayAdUtc }) {
  const today = new Date(todayAdUtc);
  const [bsDay, setBsDay] = useState(todayBs.day);
  const [bsMonth, setBsMonth] = useState(todayBs.month);
  const [bsYear, setBsYear] = useState(todayBs.year);
  const [adValue, setAdValue] = useState(`${today.getUTCFullYear()}-${pad(today.getUTCMonth() + 1)}-${pad(today.getUTCDate())}`);
  const [result, setResult] = useState('');

  const years = [];
  for (let y = BS_MIN_YEAR; y <= BS_MAX_YEAR; y++) years.push(y);
  const days = Array.from({ length: 32 }, (_, i) => i + 1);

  function fromBs(y, m, d) {
    if (d > BS_MONTH_DATA[y][m - 1]) {
      setResult(`${BS_MONTH_NAMES[m - 1]} ${y} BS has only ${BS_MONTH_DATA[y][m - 1]} days.`);
      return;
    }
    const adUtc = bsToAd(y, m, d);
    const ad = new Date(adUtc);
    setAdValue(`${ad.getUTCFullYear()}-${pad(ad.getUTCMonth() + 1)}-${pad(ad.getUTCDate())}`);
    setResult(
      `${BS_MONTH_NAMES[m - 1]} ${d}, ${y} BS  =  ${ad.getUTCDate()} ${AD_MONTH_ABBR[ad.getUTCMonth()]} ${ad.getUTCFullYear()} AD (${DOW_NAMES[ad.getUTCDay()]})`
    );
  }

  function handleBsChange(next) {
    const merged = { day: bsDay, month: bsMonth, year: bsYear, ...next };
    setBsDay(merged.day);
    setBsMonth(merged.month);
    setBsYear(merged.year);
    fromBs(merged.year, merged.month, merged.day);
  }

  function handleAdChange(value) {
    setAdValue(value);
    if (!value) return;
    const [y, m, d] = value.split('-').map(Number);
    const utc = Date.UTC(y, m - 1, d);
    const bs = adToBs(utc);
    if (bs.year < BS_MIN_YEAR || bs.year > BS_MAX_YEAR) {
      setResult('Date out of supported range (AD 1943–2043).');
      return;
    }
    setBsDay(bs.day);
    setBsMonth(bs.month);
    setBsYear(bs.year);
    setResult(
      `${d} ${AD_MONTH_ABBR[m - 1]} ${y} AD  =  ${BS_MONTH_NAMES[bs.month - 1]} ${bs.day}, ${bs.year} BS (${DOW_NAMES[new Date(utc).getUTCDay()]})`
    );
  }

  return (
    <div className="converter">
      <h2>मिति परिवर्तक · Date Converter</h2>
      <div className="conv-grid">
        <div className="conv-col">
          <label>Bikram Sambat (BS)</label>
          <div className="conv-row">
            <select value={bsDay} onChange={(e) => handleBsChange({ day: +e.target.value })}>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select value={bsMonth} onChange={(e) => handleBsChange({ month: +e.target.value })}>
              {BS_MONTH_NAMES.map((n, i) => (
                <option key={n} value={i + 1}>{n}</option>
              ))}
            </select>
            <select value={bsYear} onChange={(e) => handleBsChange({ year: +e.target.value })}>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="conv-arrow">→</div>
        <div className="conv-col">
          <label>Gregorian (AD)</label>
          <div className="conv-row">
            <input type="date" value={adValue} onChange={(e) => handleAdChange(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="conv-result">{result}</div>
    </div>
  );
}
