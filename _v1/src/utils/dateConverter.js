import { BS_MONTH_DATA, BS_MIN_YEAR, BS_MAX_YEAR, REF_AD_UTC, MS_DAY } from '../data/bsMonthData';

export function yearTotal(y) {
  return BS_MONTH_DATA[y].reduce((a, b) => a + b, 0);
}

/** Gregorian date (UTC ms) -> BS { year, month, day } (1-indexed) */
export function adToBs(adUtcMs) {
  let diff = Math.round((adUtcMs - REF_AD_UTC) / MS_DAY);
  let y = BS_MIN_YEAR;
  while (diff >= yearTotal(y)) {
    diff -= yearTotal(y);
    y++;
    if (y > BS_MAX_YEAR) break;
  }
  let m = 0;
  while (diff >= BS_MONTH_DATA[y][m]) {
    diff -= BS_MONTH_DATA[y][m];
    m++;
  }
  return { year: y, month: m + 1, day: diff + 1 };
}

/** BS { year, month, day } -> AD UTC ms */
export function bsToAd(y, m, d) {
  let total = 0;
  for (let yy = BS_MIN_YEAR; yy < y; yy++) total += yearTotal(yy);
  for (let mm = 0; mm < m - 1; mm++) total += BS_MONTH_DATA[y][mm];
  total += d - 1;
  return REF_AD_UTC + total * MS_DAY;
}

export const BS_MONTH_NAMES = ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
export const BS_MONTH_NAMES_NP = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'];
export const AD_MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DOW_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DOW_NAMES_NP = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि'];

// Devanagari numerals, for authentic Nepali-patro-style date display.
const NP_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
export function toNpDigits(n) {
  return String(n)
    .split('')
    .map((c) => (/[0-9]/.test(c) ? NP_DIGITS[+c] : c))
    .join('');
}
