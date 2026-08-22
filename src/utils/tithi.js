import { MS_DAY } from '../data/bsMonthData';

// Computed astronomically from the mean synodic month, anchored to the
// well-known reference new moon of 6 Jan 2000, 18:14 UTC. This gives
// full/new moon dates accurate to within about a day of the true lunar
// event -- good enough to mark on a calendar, but the traditional Nepali
// tithi (defined by the Moon's *true*, non-mean, elongation) can
// occasionally fall a day earlier/later than this approximation.
export const SYNODIC_MONTH = 29.530588861;
const REF_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);

export function moonAge(utcMs) {
  const days = (utcMs - REF_NEW_MOON_UTC) / MS_DAY;
  let age = days % SYNODIC_MONTH;
  if (age < 0) age += SYNODIC_MONTH;
  return age; // 0 = new moon, ~14.77 = full moon
}

export function findMoonDays(daysInMonth, firstDayAdUtc) {
  let bestNew = { d: null, dist: Infinity };
  let bestFull = { d: null, dist: Infinity };
  for (let d = 1; d <= daysInMonth; d++) {
    const utc = firstDayAdUtc + (d - 1) * MS_DAY + 12 * 3600000; // sample at local noon
    const age = moonAge(utc);
    const distNew = Math.min(age, SYNODIC_MONTH - age);
    const distFull = Math.abs(age - SYNODIC_MONTH / 2);
    if (distNew < bestNew.dist) bestNew = { d, dist: distNew };
    if (distFull < bestFull.dist) bestFull = { d, dist: distFull };
  }
  return {
    newMoonDay: bestNew.dist < 1 ? bestNew.d : null,
    fullMoonDay: bestFull.dist < 1 ? bestFull.d : null,
  };
}

// Tithi (lunar day): 15 waxing (Shukla Paksha) + 15 waning (Krishna Paksha)
// tithis per lunation, derived from the same mean-synodic approximation.
const TITHI_BASE_NAMES = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shasthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi'];
const TITHI_BASE_NAMES_NP = ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी'];

export function getTithi(utcMs) {
  const age = moonAge(utcMs);
  const tithiLen = SYNODIC_MONTH / 30;
  let idx = Math.floor(age / tithiLen); // 0..29
  if (idx > 29) idx = 29;
  const paksha = idx < 15 ? 'Shukla' : 'Krishna';
  const pakshaNp = idx < 15 ? 'शुक्ल' : 'कृष्ण';
  const posInPaksha = idx % 15; // 0..14
  const isEnd = posInPaksha === 14;
  const name = isEnd ? (paksha === 'Shukla' ? 'Purnima' : 'Amavasya') : TITHI_BASE_NAMES[posInPaksha];
  const nameNp = isEnd ? (paksha === 'Shukla' ? 'पूर्णिमा' : 'औंसी') : TITHI_BASE_NAMES_NP[posInPaksha];
  return { paksha, pakshaNp, name, nameNp, num: posInPaksha + 1 };
}
