import { useEffect } from 'react';
import { useOutletContext, useLoaderData } from '@remix-run/react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { departuresAtom, departuresSelector } from '../store/atom/schedule';
import axios from 'axios';
import ScheduleTable from '../layouts/ScheduleTable';

export const loader = async ({ req, params }) => {
  const apiKey = process.env.RAPID_API_KEY_FR24;
  return apiKey;
};

const Departures = () => {
  const activeIata = useOutletContext();
  const apiKey = useLoaderData();

  const setDeparturesData = useSetRecoilState(departuresAtom);
  const departuresData = useRecoilValue(departuresSelector);

  useEffect(() => {
    async function getDepartures() {
      await axios
        .request({
          method: 'GET',
          url: 'https://flightradar24-com.p.rapidapi.com/airports/departures',
          params: { airport_id: `${activeIata}` },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'flightradar24-com.p.rapidapi.com',
          },
        })
        .then((res) => {
          setDeparturesData(res.data);
        })
        .catch((err) => console.log(err));
    }
    getDepartures();
  }, []);

  return (
    <>
      {departuresData ? (
        <ScheduleTable scheduleData={departuresData} />
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Departures;
