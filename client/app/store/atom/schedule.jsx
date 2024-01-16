import { atom, selector } from 'recoil';

export const scheduleAtom = atom({
  key: 'scheduleAtom',
  default: {},
});

export const scheduleSelector = selector({
  key: 'scheduleSelector',
  get: ({ get }) => {
    const schedules = get(scheduleAtom);
    return schedules;
  },
});
