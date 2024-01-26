import { useRecoilValue } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import { FaLocationDot } from 'react-icons/fa6';
import { Outlet, useLocation } from '@remix-run/react';
import GeneralTab from '../layouts/GeneralTab';
import airportData from '../airportDetails.json';
import AirportTabs from '../layouts/AirportTabs';

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
      <section className='max-w-[100%] rounded-[10px] p-[1em] mt-[1em] max-h-[330px] flex gap-[1em] justify-between items-center bg-[#202020] overflow-hidden md:flex-col'>
        <div className='md:order-2'>
          <h1
            className='text-[2rem] text-[#fff] font-[700] md:text-[1.4rem]'
            suppressHydrationWarning={true}
          >
            {airport.name} ({airport.iata}/{airport.icao})
          </h1>
          <p className='text-[1.2rem] font-[600] flex items-center md:justify-center gap-[.4em] text-[#e2e2e2] md:text-[1rem]'>
            <FaLocationDot />
            {airport.location} ({airport.country_iso})
          </p>
        </div>
        <img
          src={img}
          alt=''
          className='relative right-0 max-h-[220px] overflow-hidden md:order-1 max-w-[100%] rounded-[6px]'
        />
      </section>
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
