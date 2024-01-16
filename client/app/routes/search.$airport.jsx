import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import AirportCard from '../components/AirportCard';
import { airportAtom } from '../store/atom/airport';

const Airport = memo(() => {
  const airportDetails = useRecoilValue(airportAtom);
  console.log(airportDetails);

  return (
    <>
      <h6 className='my-[1em] font-[600] text-[1.6rem]'>Airport Found</h6>
      <AirportCard airport={airportDetails} />
    </>
  );
});

export default Airport;
