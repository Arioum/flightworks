import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// Both atoms hold { iata, response, fetchedAt } (see useAirportResource). The
// arrivals/departures responses don't say which airport they are for, so the
// iata tag is what stops one airport's flights showing on another's page.
// Read flights with flightsOf() from utils/api.

export const arrivalsAtom = atom({
  key: 'arrivalsAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const departuresAtom = atom({
  key: 'departuresAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
