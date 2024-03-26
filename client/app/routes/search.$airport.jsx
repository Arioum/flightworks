import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import AirportCard from '../components/AirportCard';
import Loader from '../components/Loader';

const Airport = memo(() => {
  const airportDetails = useRecoilValue(airportAtom);

  return (
    <>
      {airportDetails ? (
        <div>
          <h6 className='my-[1em] font-[600] text-[1.6rem]'>Airport Found</h6>
          <AirportCard airport={airportDetails} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
});

export default Airport;
