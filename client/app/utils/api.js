import axios from 'axios';

// RapidAPI calls used by the airport page. Each one is a single request
// against a free-tier quota, so callers cache results (see useAirportResource).
// These are module-level functions on purpose: useAirportResource needs a
// stable function identity to avoid refetch loops.

const FR24_HOST = 'flightradar24-com.p.rapidapi.com';
const AIRPORT_INFO_HOST = 'airport-info.p.rapidapi.com';

const rapidApiGet = (host, path, params, apiKey) =>
  axios
    .request({
      method: 'GET',
      url: `https://${host}${path}`,
      params,
      headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': host },
    })
    .then((res) => res.data);

// Flightradar24 (RapidAPI "Flightradar24 com")
export const fetchAirportDetails = (iata, apiKey) =>
  rapidApiGet(FR24_HOST, '/airports/detail', { airport_id: iata }, apiKey);
export const fetchArrivals = (iata, apiKey) =>
  rapidApiGet(FR24_HOST, '/airports/arrivals', { airport_id: iata }, apiKey);
export const fetchDepartures = (iata, apiKey) =>
  rapidApiGet(FR24_HOST, '/airports/departures', { airport_id: iata }, apiKey);

// Airport Info (address, phone). Its error responses carry an `error` field.
export const fetchAirportInfo = (iata, apiKey) =>
  rapidApiGet(AIRPORT_INFO_HOST, '/airport', { iata }, apiKey);

// --- Reading responses -------------------------------------------------------

// FR24 airport detail response -> pluginData (details, weather, runways...).
export const pluginDataOf = (response) => response?.data?.airport?.pluginData ?? null;

// FR24 arrivals/departures response -> array of flights.
export const flightsOf = (response, mode) => {
  const flights = response?.data?.airport?.pluginData?.schedule?.[mode]?.data;
  return Array.isArray(flights) ? flights : null;
};

// --- Validators: false means "treat as not found" ----------------------------

export const hasAirportDetails = (response) => Boolean(pluginDataOf(response)?.details?.name);
export const hasArrivals = (response) => flightsOf(response, 'arrivals') !== null;
export const hasDepartures = (response) => flightsOf(response, 'departures') !== null;
export const isAirportInfo = (response) =>
  Boolean(response && !response.error && response.iata);

// --- Errors ------------------------------------------------------------------

// Maps a failed request to a kind StatusMessage knows how to explain.
export function errorKind(error) {
  const status = error?.response?.status;
  if (status === 429) return 'limit';
  if (status === 401 || status === 403) return 'auth';
  if (status === 400 || status === 404) return 'notFound';
  return 'error';
}
