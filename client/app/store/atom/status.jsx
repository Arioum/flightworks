import { atom } from 'recoil';

// true once any API request is refused for hitting the plan's request limit
// (HTTP 429); back to false as soon as a request succeeds again. Drives the
// site-wide LimitBanner. Not persisted: a new visit starts optimistic.
export const apiLimitAtom = atom({
  key: 'apiLimitAtom',
  default: false,
});
