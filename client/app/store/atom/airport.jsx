import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const airportAtom = atom({
  key: 'airportAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const airportDetailsAtom = atom({
  key: 'airportDetailsAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const airportImageSelector = selector({
  key: 'airportImageSelector',
  get: ({ get }) => {
    const arrivalsData = get(airportDetailsAtom);
    const airportImage =
      arrivalsData.data.airport.pluginData.details.airportImages.medium[0].src;
    return airportImage;
  },
});
