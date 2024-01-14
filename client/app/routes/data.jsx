import { Link } from '@remix-run/react';

const Data = () => {
  return (
    <main className='content-wrapper'>
      <section>
        <h1 className='text-[1.8rem] mt-[2em] font-[500]'>Data source</h1>
        <hr className='py-[1em]' />
        <div>
          <h2 className='text-[1.2rem] font-[500]'>Airport Info:</h2>
          <Link
            to='https://rapidapi.com/Active-api/api/airport-info'
            target='blank'
          >
            https://rapidapi.com/Active-api/api/airport-info
          </Link>
        </div>
        <div className='mt-[1em]'>
          <h2 className='text-[1.2rem] font-[500]'>Flight Schedule Info:</h2>
          <Link
            to='https://rapidapi.com/finestoreuk/api/flight-tracker-radar'
            target='blank'
          >
            https://rapidapi.com/finestoreuk/api/flight-tracker-radar
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Data;
