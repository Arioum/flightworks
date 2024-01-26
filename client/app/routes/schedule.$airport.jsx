import { useRecoilValue } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import { Outlet, useLocation } from '@remix-run/react';
import GeneralTab from '../layouts/GeneralTab';
import airportData from '../airportDetails.json';
import AirportTabs from '../layouts/AirportTabs';
import AirportHeader from '../layouts/AirportHeader';

const SchedulePage = () => {
  const airport = useRecoilValue(airportAtom);
  const { pathname } = useLocation();
  const activeIata = pathname.split('/')[2];
  const isGeneralRoute = pathname === `/schedule/${activeIata}`;
  const isArrivalsRoute = pathname === `/schedule/${activeIata}/arrivals`;
  const isDeparturesRoute = pathname === `/schedule/${activeIata}/departures`;

  const airportInfo = airportData.data.airport.pluginData;
  const img = airportInfo.details.airportImages.medium[0].src;

  return (
    <main className='content-wrapper md:px-[1em]'>
      <AirportHeader airport={airport} img={img} />
      <section className='mb-[2em]'>
        <AirportTabs
          activeIata={activeIata}
          isGeneralRoute={isGeneralRoute}
          isArrivalsRoute={isArrivalsRoute}
          isDeparturesRoute={isDeparturesRoute}
        />
        {isGeneralRoute && <GeneralTab />}
        <Outlet />
      </section>
    </main>
  );
};

export default SchedulePage;
