// Helpers for the "Load earlier data" button in ScheduleTable.
//
// The API (RapidAPI "Flightradar24 com") has
//   GET /airports/arrivals/load-earlier-flights?airport_id=&page=
//   GET /airports/departures/load-earlier-flights?airport_id=&page=
// Its response is assumed to have the same shape as /airports/arrivals and
// /airports/departures (data.airport.pluginData.schedule.<mode>), matching the
// saved sample app/arrival-loadmore-data.json. Anything else is treated as an
// unexpected response rather than crashing the table.

import { flightKey, scheduledTime } from './flightFormat.js';

// mode is 'arrivals' or 'departures'. Entries without a flight id are never
// treated as duplicates (flightKey returns null for them).

// Parses one load-earlier-flights response. Returns null if the shape is
// unexpected, otherwise { flights, hasMore, nextPage }.
export function parseEarlierFlights(responseData, mode, requestedPage) {
  const schedule = responseData?.data?.airport?.pluginData?.schedule?.[mode];
  if (!Array.isArray(schedule?.data)) return null;

  const current = schedule.page?.current ?? requestedPage;
  const total = schedule.page?.total ?? current;
  return {
    flights: schedule.data,
    hasMore: schedule.data.length > 0 && current < total,
    nextPage: current + 1,
  };
}

// Adds newly loaded earlier flights to the ones already loaded, skipping any
// already on screen (earlier pages or the main schedule), sorted oldest first.
export function mergeEarlierFlights(existingEarlier, newFlights, mainFlights, mode) {
  const seen = new Set(
    [...existingEarlier, ...mainFlights]
      .map((entry) => flightKey(entry, mode))
      .filter(Boolean)
  );
  const fresh = newFlights.filter((entry) => {
    const key = flightKey(entry, mode);
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return [...fresh, ...existingEarlier].sort(
    (a, b) => (scheduledTime(a, mode) ?? 0) - (scheduledTime(b, mode) ?? 0)
  );
}
