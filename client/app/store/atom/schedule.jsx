import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const arrivalsAtom = atom({
  key: 'arrivalsAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const arrivalsSelector = selector({
  key: 'arrivalsSelector',
  get: ({ get }) => {
    const arrivalsData = get(arrivalsAtom);
    const flightData =
      arrivalsData.data.airport.pluginData.schedule.arrivals.data;
    return flightData;
  },
});

export const moreArrivalsAtom = atom({
  key: 'moreArrivalsAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const departuresAtom = atom({
  key: 'departuresAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const departuresSelector = selector({
  key: 'departuresSelector',
  get: ({ get }) => {
    const departuresData = get(departuresAtom);
    const flightData =
      departuresData.data.airport.pluginData.schedule.departures.data;
    return flightData;
  },
});

export const moreDeparturesAtom = atom({
  key: 'moreDeparturesAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
