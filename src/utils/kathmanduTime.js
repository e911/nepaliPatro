// Nepal Standard Time is a fixed UTC+5:45 offset with no daylight saving,
// so a plain millisecond shift is exact -- no need for the Intl timezone
// database. Reading the shifted Date's getUTC* fields then gives the
// correct Kathmandu wall-clock values regardless of the visitor's own
// timezone.
const NPT_OFFSET_MS = (5 * 60 + 45) * 60 * 1000;

/** Returns a Date object whose getUTC* fields equal the current Kathmandu wall clock. */
export function nowInKathmandu() {
  return new Date(Date.now() + NPT_OFFSET_MS);
}

/** Returns the real UTC ms of "right now" (for BS/AD conversion, which works in UTC internally). */
export function kathmanduTodayUtcMidnight() {
  const kt = nowInKathmandu();
  return Date.UTC(kt.getUTCFullYear(), kt.getUTCMonth(), kt.getUTCDate());
}
