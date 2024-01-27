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
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const departuresAtom = atom({
  key: 'departuresAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const moreDeparturesAtom = atom({
  key: 'moreDeparturesAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
