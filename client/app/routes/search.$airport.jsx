import { useOutletContext } from '@remix-run/react';
import AirportCard from '../components/AirportCard';

const Airport = () => {
  const airportDetails = useOutletContext();

  return (
    <main>
      <h6>Airport Found</h6>
      <AirportCard airport={airportDetails} />
    </main>
  );
};

export default Airport;
