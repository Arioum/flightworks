import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useHydrated } from './useHydrated';
import { errorKind } from './api';
import { apiLimitAtom } from '../store/atom/status';

// Loads one API response for one airport and keeps it in a persisted Recoil
// atom as { iata, response, fetchedAt }.
//
// - Data stored for a different airport is never returned, so the page never
//   shows the previous airport while the next one loads.
// - Data younger than maxAgeMs is reused without a request (the APIs have
//   small free quotas). Older data is shown while a fresh copy loads.
// - reload() always makes a request (Retry / Refresh buttons).
//
// fetcher(iata, apiKey) and isValid(response) must be module-level functions
// (stable identities), otherwise the effect would refetch on every render.
//
// Returns { response, fetchedAt, status, failure, refreshing, reload }:
//   status: 'loading' | 'ready' | 'failed'
//   failure: null | 'notFound' | 'limit' | 'auth' | 'error' (latest attempt)
export function useAirportResource(atom, iata, fetcher, apiKey, options = {}) {
  const { maxAgeMs = Infinity, isValid = defaultIsValid } = options;
  const hydrated = useHydrated();
  const [stored, setStored] = useRecoilState(atom);
  const [reloadAt, setReloadAt] = useState(0);
  const [failed, setFailed] = useState(null); // { iata, reloadAt, kind }
  const setLimited = useSetRecoilState(apiLimitAtom);

  useEffect(() => {
    if (!hydrated || !iata) return undefined;
    const fetchedAt = stored?.iata === iata ? stored.fetchedAt ?? 0 : null;
    const fresh = fetchedAt !== null && Date.now() - fetchedAt < maxAgeMs;
    if (fresh && reloadAt <= fetchedAt) return undefined;

    let cancelled = false;
    requestOnce(fetcher, iata, apiKey, reloadAt).then(
      (response) => {
        if (cancelled) return;
        setLimited(false); // any answer means the API is accepting requests
        if (isValid(response)) {
          setStored({ iata, response, fetchedAt: Date.now() });
        } else {
          setFailed({ iata, reloadAt, kind: 'notFound' });
        }
      },
      (error) => {
        if (cancelled) return;
        console.error(error);
        const kind = errorKind(error);
        if (kind === 'limit') setLimited(true);
        setFailed({ iata, reloadAt, kind });
      }
    );
    return () => {
      cancelled = true;
    };
  }, [hydrated, iata, apiKey, reloadAt, stored, setStored, setLimited, fetcher, isValid, maxAgeMs]);

  const matches = hydrated && stored?.iata === iata;
  const failure = failed?.iata === iata && failed.reloadAt === reloadAt ? failed.kind : null;
  const refreshing = matches && !failure && reloadAt > (stored.fetchedAt ?? 0);

  return {
    response: matches ? stored.response : null,
    fetchedAt: matches ? stored.fetchedAt : null,
    status: matches ? 'ready' : failure ? 'failed' : 'loading',
    failure,
    refreshing,
    reload: () => setReloadAt(Date.now()),
  };
}

const defaultIsValid = (response) => response != null;

// Shares one in-flight request per (fetcher, airport, reload). React StrictMode
// runs effects twice in development, which would otherwise spend two API
// requests on every page load; it also covers two components asking at once.
const inFlight = new Map();
function requestOnce(fetcher, iata, apiKey, reloadAt) {
  if (!inFlight.has(fetcher)) inFlight.set(fetcher, new Map());
  const requests = inFlight.get(fetcher);
  const key = `${iata}|${reloadAt}`;
  if (!requests.has(key)) {
    const promise = fetcher(iata, apiKey);
    requests.set(key, promise);
    const forget = () => requests.delete(key);
    promise.then(forget, forget);
  }
  return requests.get(key);
}
