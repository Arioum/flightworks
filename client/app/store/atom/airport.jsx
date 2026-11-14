import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// Both atoms hold { iata, response, fetchedAt } (see useAirportResource), so a
// stored response is only ever used for the airport it was fetched for.
// Values persisted by older versions (raw responses) have no `iata` and are
// simply refetched.

// Airport Info API: address, phone.
export const airportAtom = atom({
  key: 'airportAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// Flightradar24 airport detail: name, images, weather, runways, stats.
export const airportDetailsAtom = atom({
  key: 'airportDetailsAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
