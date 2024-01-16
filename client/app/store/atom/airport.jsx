import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const airportAtom = atom({
  key: 'airportAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const airportSelector = selector({
  key: 'airportSelector',
  get: ({ get }) => {
    const airport = get(airportAtom);
    return airport;
  },
});
