import { useRecoilValue } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import { FaLocationDot } from 'react-icons/fa6';
import { Outlet, useLocation } from '@remix-run/react';
import Button from '../components/Button';
import GeneralTab from '../layouts/GeneralTab';
import airportData from '../airportDetails.json';

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
    <main className='content-wrapper'>
      <section className='max-w-[100%] rounded-[10px] p-[1em] mt-[1em] h-[250px] flex justify-between items-center bg-[#202020] overflow-hidden'>
        <div>
          <h1
            className='text-[2rem] text-[#fff] font-[700] md:text-[1.4rem]'
            suppressHydrationWarning={true}
          >
            {airport.name} ({airport.iata}/{airport.icao})
          </h1>
          <p className='text-[1.2rem] font-[600] flex items-center gap-[.4em] text-[#e2e2e2] md:text-[1rem]'>
            <FaLocationDot />
            {airport.location} ({airport.country_iso})
          </p>
        </div>
        <img
          src={img}
          alt=''
          className='relative right-0 h-[220px] overflow-hidden'
        />
      </section>
      <section className='mb-[2em]'>
        <div className='max-w-[100%] my-[1em] h-[60px] flex justify-start items-end bg-[#dddddd] overflow-hidden rounded-[10px] font-[600] text-[#000]'>
          <Button
            type={'link'}
            dest={`/schedule/${activeIata}`}
            styles={`h-[60px] w-[200px] flex justify-center items-center border-b-4 ${
              isGeneralRoute && 'border-[#6c63ff]'
            }`}
          >
            General
          </Button>
          <Button
            type={'link'}
            dest={`/schedule/${activeIata}/arrivals`}
            styles={`h-[60px] w-[200px] flex justify-center items-center border-b-4 ${
              isArrivalsRoute && 'border-[#6c63ff]'
            }`}
          >
            Arrivals
          </Button>
          <Button
            type={'link'}
            dest={`/schedule/${activeIata}/departures`}
            styles={`h-[60px] w-[200px] flex justify-center items-center border-b-4 ${
              isDeparturesRoute && 'border-[#6c63ff]'
            }`}
          >
            Departures
          </Button>
        </div>
        {isGeneralRoute && <GeneralTab />}
        <Outlet />
      </section>
    </main>
  );
};

export default SchedulePage;
