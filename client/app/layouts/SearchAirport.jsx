import { useEffect, useState } from 'react';
import { Outlet } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import axios from 'axios';

const SearchAirport = () => {
  const [airportInput, setAiportInput] = useState('');
  const [matchedAirport, setMatchedAirport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function findAirport() {
      const options = {
        method: 'GET',
        url: 'https://airport-info.p.rapidapi.com/airport',
        params: { iata: airportInput },
        headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'airport-info.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        if (!response.data.error) {
          setMatchedAirport(response.data);
          navigate(`./${airportInput}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (airportInput.length === 3) findAirport();
  }, [airportInput]);

  return (
    <section className='content-wrapper py-[2em]'>
      <h1 className='text-2xl font-[600]'>SearchAirport</h1>
      <input
        type='text'
        onChange={(e) => setAiportInput(e.target.value)}
        placeholder='Enter IATA code'
        className='px-4 py-2 border-2 rounded-[5px] focus:outline-none'
      />
      <Outlet context={matchedAirport} />
    </section>
  );
};

export default SearchAirport;
