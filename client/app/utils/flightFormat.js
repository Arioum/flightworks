// Formatting helpers for the arrivals/departures schedule.
// Everything works on one flight entry from the API ({ flight: {...} }) and
// mode 'arrivals' | 'departures'. All fields are read defensively because the
// API leaves many of them null.

// The airport this page is about ("here") and the airport at the other end.
// Arrivals: here = destination, other = origin. Departures: the reverse.
export function airportSides(flight, mode) {
  const { origin, destination } = flight?.airport ?? {};
  return mode === 'arrivals'
    ? { here: destination, other: origin }
    : { here: origin, other: destination };
}

// Scheduled time at this airport (unix seconds).
export const scheduledTime = (entry, mode) =>
  mode === 'arrivals'
    ? entry?.flight?.time?.scheduled?.arrival
    : entry?.flight?.time?.scheduled?.departure;

// Flight ids alone are not unique across days, so pair id with scheduled time.
export const flightKey = (entry, mode) => {
  const id = entry?.flight?.identification?.id;
  return id ? `${id}-${scheduledTime(entry, mode)}` : null;
};

// --- Time zones -------------------------------------------------------------
// Times are shown in the airport's own local time (like airport boards), using
// the IANA name from the API (e.g. "Asia/Kolkata"), then its UTC offset in
// seconds, then the viewer's time zone as a last resort.

const formatterCache = new Map();
function zonedFormatter(tz, options) {
  const cacheKey = JSON.stringify([tz?.name, tz?.offset, options]);
  if (formatterCache.has(cacheKey)) return formatterCache.get(cacheKey);

  let result = null;
  if (tz?.name) {
    try {
      result = { fmt: new Intl.DateTimeFormat('en-GB', { ...options, timeZone: tz.name }), shift: 0 };
    } catch {
      // Unknown zone name in this browser: fall through to the offset.
    }
  }
  if (!result && typeof tz?.offset === 'number') {
    result = { fmt: new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'UTC' }), shift: tz.offset };
  }
  if (!result) result = { fmt: new Intl.DateTimeFormat('en-GB', options), shift: 0 };

  formatterCache.set(cacheKey, result);
  return result;
}

const toDate = (unix, shift) => new Date((unix + shift) * 1000);

function formatInZone(unix, tz, options) {
  if (typeof unix !== 'number') return null;
  const { fmt, shift } = zonedFormatter(tz, options);
  return fmt.format(toDate(unix, shift));
}

// "19:35"
export const formatTime = (unix, tz) =>
  formatInZone(unix, tz, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

// "2024-01-16" in the airport's local calendar.
export function dayKey(unix, tz) {
  if (typeof unix !== 'number') return null;
  const { fmt, shift } = zonedFormatter(tz, { year: 'numeric', month: '2-digit', day: '2-digit' });
  const parts = Object.fromEntries(
    fmt.formatToParts(toDate(unix, shift)).map((p) => [p.type, p.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

// { text: "Tuesday 16 January", relative: "Today" | "Yesterday" | "Tomorrow" | null }
export function dayLabel(unix, tz, nowUnix = Math.floor(Date.now() / 1000)) {
  const key = dayKey(unix, tz);
  const relative =
    key === dayKey(nowUnix, tz) ? 'Today'
    : key === dayKey(nowUnix - 86400, tz) ? 'Yesterday'
    : key === dayKey(nowUnix + 86400, tz) ? 'Tomorrow'
    : null;
  return {
    text: formatInZone(unix, tz, { weekday: 'long', day: 'numeric', month: 'long' }),
    relative,
  };
}

// Interleaves day-break items with flights, in the order given:
// [{ type: 'day', key, label }, { type: 'flight', key, entry }, ...]
// Flights with no scheduled time stay under the current day.
export function withDayBreaks(entries, mode, nowUnix) {
  const items = [];
  let currentDay = null;
  entries.forEach((entry, index) => {
    const time = scheduledTime(entry, mode);
    const tz = airportSides(entry?.flight, mode).here?.timezone;
    const day = dayKey(time, tz);
    if (day && day !== currentDay) {
      currentDay = day;
      items.push({ type: 'day', key: `day-${day}`, label: dayLabel(time, tz, nowUnix) });
    }
    items.push({ type: 'flight', key: flightKey(entry, mode) ?? `flight-${index}`, entry });
  });
  return items;
}

// --- Other fields -------------------------------------------------------------

// 3960 -> "1h 06m"
export function formatDuration(seconds) {
  if (typeof seconds !== 'number' || seconds <= 0) return null;
  const minutes = Math.round(seconds / 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
}

// Difference between actual/estimated and scheduled, e.g. "+17 min", "5 min early".
export function formatDelay(scheduled, actual) {
  if (typeof scheduled !== 'number' || typeof actual !== 'number') return null;
  const minutes = Math.round((actual - scheduled) / 60);
  if (minutes === 0) return 'on time';
  return minutes > 0 ? `+${minutes} min` : `${-minutes} min early`;
}

// The API gives status colours as names (green/yellow/red/gray, or null).
const STATUS_COLORS = {
  green: '#22A06B',
  yellow: '#E2B203',
  red: '#E5484D',
  gray: '#B3B3B3',
};
export function statusColor(status) {
  const name = status?.icon ?? status?.generic?.status?.color;
  return STATUS_COLORS[name] ?? STATUS_COLORS.gray;
}
