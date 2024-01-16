'use client';

import { useState, useEffect } from 'react';
import {
  FaPhone,
  FaLocationDot,
  FaLocationArrow,
  FaList,
} from 'react-icons/fa6';
import Button from './Button';

const AirportCard = ({ airport }) => {
  const [mounted, setMounted] = useState(false);
  const { latitude, longitude } = airport;
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className='border-[2px] rounded-[1em] p-[1rem]'>
      {mounted && (
        <>
          <h1
            className='text-[2rem] font-[700] md:text-[1.4rem]'
            suppressHydrationWarning={true}
          >
            {airport.name} ({airport.iata}/{airport.icao})
          </h1>
          <p className='text-[1.2rem] font-[600] flex items-center gap-[.4em] text-[#505050] md:text-[1rem]'>
            <FaLocationDot />
            {airport.location} ({airport.country_iso})
          </p>
          <div className='flex flex-col py-[1em]'>
            {airport.county && <p>District/County: {airport.county}</p>}
            <p>Country: {airport.country}</p>
            <p>State: {airport.state}</p>
            {airport.postal_code && <p>Postal Code: {airport.postal_code}</p>}
          </div>
          <p className='font-[600] flex items-center gap-[.4em] bg-[#ececec] max-w-fit px-[.8em] py-[.4em] rounded-[50em]'>
            <FaPhone />
            {airport.phone}
          </p>
          <div className='flex gap-[.6em] mt-[1em] md:flex-col md:gap-0'>
            <Button
              type={'link'}
              dest={`https://www.google.com/maps/@${latitude},${longitude},15z`}
              target={'blank'}
              variant={'secondary'}
              styles={
                'flex items-center justify-center gap-[.5em] max-w-fit px-0 mt-[10px] md:max-w-[100%]'
              }
            >
              <FaLocationArrow />
              View in Maps
            </Button>
            <Button
              type={'link'}
              dest={``}
              target={'blank'}
              variant={'primary'}
              styles={
                'flex items-center justify-center gap-[.5em] max-w-fit px-0 mt-[10px] md:max-w-[100%]'
              }
            >
              <FaList />
              View Schedule
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default AirportCard;
