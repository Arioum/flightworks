import { useEffect, useState } from 'react';
import { Outlet } from '@remix-run/react';
import { useSetRecoilState } from 'recoil';
import { airportAtom } from '../store/atom/airport';
import { useNavigate } from '@remix-run/react';
import axios from 'axios';

const SearchAirport = ({ apiKey }) => {
  const [airportInput, setAiportInput] = useState('');
  const setAirportData = useSetRecoilState(airportAtom);
  const navigate = useNavigate();

  useEffect(() => {
    async function findAirport() {
      const options = {
        method: 'GET',
        url: 'https://airport-info.p.rapidapi.com/airport',
        params: { iata: airportInput },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'airport-info.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        if (!response.data.error) {
          setAirportData(response.data);
          navigate(`./${airportInput}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (airportInput.length === 3) findAirport();
  }, [airportInput]);

  return (
    <section>
      <h1 className='text-2xl font-[600] mb-[.5em]'>SearchAirport</h1>
      <input
        type='text'
        onChange={(e) => setAiportInput(e.target.value)}
        placeholder='Enter IATA code'
        className='px-4 py-2 border-2 rounded-[5px] focus:outline-none'
      />
      <Outlet />
    </section>
  );
};

export default SearchAirport;
