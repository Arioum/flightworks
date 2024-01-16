import { useRecoilValue } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import { FaLocationDot } from 'react-icons/fa6';
import { useLocation } from '@remix-run/react';
import ScheduleTable from '../layouts/ScheduleTable';
import scheduleData from '../arrival-data.json';
import Button from '../components/Button';

const SchedulePage = () => {
  const airport = useRecoilValue(airportAtom);
  const { pathname } = useLocation();
  const activeIata = pathname.split('/')[2];

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
        <div className='max-w-[100%] p-[1em] mt-[1em] h-[60px] flex justify-start items-end'>
          <Button>Arrivals</Button>
          <Button>Departures</Button>
        </div>
        <ScheduleTable scheduleData={scheduleData} />
      </section>
    </main>
  );
};

export default SchedulePage;
