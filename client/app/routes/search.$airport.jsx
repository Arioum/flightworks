import { useOutletContext } from '@remix-run/react';
import AirportCard from '../components/AirportCard';

const Airport = () => {
  const airportDetails = useOutletContext();

  return (
    <>
      <h6 className='my-[1em] font-[600] text-[1.6rem]'>Airport Found</h6>
      <AirportCard airport={airportDetails} />
    </>
  );
};

export default Airport;
