import { useOutletContext } from '@remix-run/react';
import ScheduleTable from './ScheduleTable';
import Loader from '../components/Loader';
import StatusMessage from '../components/StatusMessage';
import { arrivalsAtom, departuresAtom } from '../store/atom/schedule';
import { useAirportResource } from '../utils/useAirportResource';
import {
  fetchArrivals,
  fetchDepartures,
  flightsOf,
  hasArrivals,
  hasDepartures,
} from '../utils/api';

// Schedules change quickly, but each fetch costs a request: reuse for 5 min.
const SCHEDULE_MAX_AGE_MS = 5 * 60 * 1000;

const CONFIG = {
  arrivals: { atom: arrivalsAtom, fetcher: fetchArrivals, isValid: hasArrivals },
  departures: { atom: departuresAtom, fetcher: fetchDepartures, isValid: hasDepartures },
};

// Arrivals or departures tab. iata and the FR24 key come from the airport page.
const ScheduleTab = ({ mode }) => {
  const { iata, fr24Key } = useOutletContext();
  const { atom, fetcher, isValid } = CONFIG[mode];
  const schedule = useAirportResource(atom, iata, fetcher, fr24Key, {
    maxAgeMs: SCHEDULE_MAX_AGE_MS,
    isValid,
  });
  const flights = flightsOf(schedule.response, mode);

  if (!flights) {
    return schedule.status === 'loading' ? (
      <Loader label={`Loading ${mode}…`} />
    ) : (
      <StatusMessage kind={schedule.failure} iata={iata} onRetry={schedule.reload} compact />
    );
  }

  const updated = new Date(schedule.fetchedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='flex flex-col gap-[8px]'>
      <div className='flex items-center justify-end gap-[12px] text-[13px] text-[#808080]'>
        {schedule.failure && <span className='text-[#c0392b]'>Refresh failed.</span>}
        <span className='mr-auto font-[600] text-[#4D4D4D]'>
          {flights.length} {mode === 'arrivals' ? 'arrivals' : 'departures'} listed
        </span>
        <span>Updated {updated}</span>
        <button
          type='button'
          onClick={schedule.reload}
          disabled={schedule.refreshing}
          className='font-[600] text-[#6c63ff] hover:underline disabled:text-[#B3B3B3] disabled:no-underline'
        >
          {schedule.refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      <ScheduleTable
        key={`${iata}-${mode}`}
        scheduleData={flights}
        mode={mode}
        airportId={iata}
        apiKey={fr24Key}
      />
    </div>
  );
};

export default ScheduleTab;
