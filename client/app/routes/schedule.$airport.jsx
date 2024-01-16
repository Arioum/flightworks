import { useRecoilValue } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import { FaLocationDot } from 'react-icons/fa6';
import { Outlet, useLocation } from '@remix-run/react';
import Button from '../components/Button';

const SchedulePage = () => {
  const airport = useRecoilValue(airportAtom);
  const { pathname } = useLocation();
  const activeIata = pathname.split('/')[2];
  const isGeneralRoute = pathname === `/schedule/${activeIata}`;

  return (
    <main className='content-wrapper'>
      <section className='max-w-[100%] border-2 rounded-[10px] p-[1em] mt-[1em] h-[150px] flex justify-start items-end bg-[#202020]'>
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
      </section>
      <section className='mb-[2em]'>
        <div className='max-w-[100%] my-[1em] h-[60px] flex justify-start items-end bg-[#dddddd] overflow-hidden rounded-[10px] font-[600] text-[#000]'>
          <Button
            type={'link'}
            dest={`/schedule/${activeIata}`}
            styles={
              'h-[60px] w-[200px] flex justify-center items-center border-b-4 border-[#6c63ff]'
            }
          >
            General
          </Button>
          <Button
            type={'link'}
            dest={`/schedule/${activeIata}/arrivals`}
            styles={
              'h-[60px] w-[200px] flex justify-center items-center border-x-4 border-x-[#eee]'
            }
          >
            Arrivals
          </Button>
          <Button
            type={'link'}
            dest={`/schedule/${activeIata}/departures`}
            styles={
              'h-[60px] w-[200px] flex justify-center items-center'
            }
          >
            Departures
          </Button>
        </div>
        {isGeneralRoute && <div>general content</div>}
        <Outlet />
      </section>
    </main>
  );
};

export default SchedulePage;
