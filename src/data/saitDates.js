// Auspicious wedding (Shubha Sait) dates.
// Source: Nepal Panchang Nirnayak Samiti listing for BS 2083 (AD 2026-27),
// via Merokalam's published sait table. Month index: 1=Baisakh ... 12=Chaitra.
export const SAIT_DATES = {
  2083: {
    1: [7,8,22,23,24,25,30,31],
    3: [9,13,14,15,17,18,23],
    8: [9,10,16,17,19,24,25,26],
    10: [4,12,15,19,20,27],
    11: [3,4,11,12,15,16,17,18,20,25,26,30]
  }
};

export function isSait(year, month, day) {
  return !!(SAIT_DATES[year] && SAIT_DATES[year][month] && SAIT_DATES[year][month].includes(day));
}
