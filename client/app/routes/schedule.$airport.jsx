import { Outlet, useLoaderData, useLocation, useParams } from '@remix-run/react';
import { airportAtom, airportDetailsAtom } from '../store/atom/airport';
import AirportHeader from '../layouts/AirportHeader';
import AirportTabs from '../layouts/AirportTabs';
import GeneralTab from '../layouts/GeneralTab';
import Loader from '../components/Loader';
import StatusMessage from '../components/StatusMessage';
import { useAirportResource } from '../utils/useAirportResource';
import {
  fetchAirportDetails,
  fetchAirportInfo,
  hasAirportDetails,
  isAirportInfo,
  pluginDataOf,
} from '../utils/api';

// Airport page: where search lands. Shows FR24 details (header, General tab)
// plus Airport Info's address/phone, with Arrivals/Departures as child routes.

export const meta = ({ params }) => [
  { title: `${(params.airport ?? '').toUpperCase()} airport · FlightWorks` },
];

export const loader = async () => ({
  fr24Key: process.env.RAPID_API_KEY_FR24,
  airportInfoKey: process.env.RAPID_API_KEY_AIRPORT,
});

// Weather and counts change; reuse a fetched copy for 15 minutes.
const DETAILS_MAX_AGE_MS = 15 * 60 * 1000;

const AirportPage = () => {
  const { fr24Key, airportInfoKey } = useLoaderData();
  const iata = (useParams().airport ?? '').toUpperCase();
  const { pathname } = useLocation();
  const tab = pathname.split('/')[3]?.toLowerCase() || 'general';

  const details = useAirportResource(airportDetailsAtom, iata, fetchAirportDetails, fr24Key, {
    maxAgeMs: DETAILS_MAX_AGE_MS,
    isValid: hasAirportDetails,
  });
  const pluginData = pluginDataOf(details.response);

  // Address/phone never change: fetched once per airport and kept. Only asked
  // for once the airport is known to exist, so a mistyped code costs 1 request.
  const info = useAirportResource(
    airportAtom,
    pluginData ? iata : null,
    fetchAirportInfo,
    airportInfoKey,
    { isValid: isAirportInfo }
  );

  if (!pluginData) {
    return (
      <main className='content-wrapper py-[32px] md:px-[1em]'>
        {details.status === 'loading' ? (
          <Loader label={`Loading ${iata}…`} />
        ) : (
          <StatusMessage kind={details.failure} iata={iata} onRetry={details.reload} />
        )}
      </main>
    );
  }

  return (
    <main className='content-wrapper md:px-[1em]'>
      <AirportHeader details={pluginData.details} info={info.response} />
      <section className='mb-[2em]'>
        <AirportTabs
          activeIata={iata}
          isGeneralRoute={tab === 'general'}
          isArrivalsRoute={tab === 'arrivals'}
          isDeparturesRoute={tab === 'departures'}
        />
        {tab === 'general' && <GeneralTab pluginData={pluginData} info={info.response} />}
        <Outlet context={{ iata, fr24Key }} />
      </section>
    </main>
  );
};

export default AirportPage;
