import { useSyncExternalStore } from 'react';

// false during server render and hydration, true in the browser afterwards.
// Use it to keep the first client render identical to the server HTML before
// showing browser-only things (persisted Recoil data, Leaflet maps).
const noopSubscribe = () => () => {};

export const useHydrated = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);
