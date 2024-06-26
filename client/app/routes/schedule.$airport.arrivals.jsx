import { useEffect } from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import {
  arrivalsAtom,
  arrivalsSelector,
  moreArrivalsAtom,
} from '../store/atom/schedule';
import ScheduleTable from '../layouts/ScheduleTable';
import Loader from '../components/Loader';

export const loader = async ({ req, params }) => {
  const apiKey = process.env.RAPID_API_KEY_FR24;
  return apiKey;
};

const Arrivals = () => {
  const activeIata = useOutletContext();
  const apiKey = useLoaderData();
  console.log(activeIata);
  console.log(apiKey);

  const setArrivalsData = useSetRecoilState(arrivalsAtom);
  const arrivalsData = useRecoilValue(arrivalsSelector);

  // const moreArrivalsData = useRecoilValue(moreArrivalsAtom);
  // const setMoreArrivalsData = useSetRecoilState(moreArrivalsAtom);

  useEffect(() => {
    async function getArrivals() {
      console.log('efffect');
      await axios
        .request({
          method: 'GET',
          url: 'https://flightradar24-com.p.rapidapi.com/airports/arrivals',
          params: { airport_id: `${activeIata}` },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'flightradar24-com.p.rapidapi.com',
          },
        })
        .then((res) => {
          console.log('hi');
          console.log(res);
          console.log(res.data);
          console.log('hi');
          setArrivalsData(res?.data);
        })
        .catch((err) => console.log(err));
    }
    getArrivals();
    console.log('efffect');
  }, []);

  return (
    <>
      {arrivalsData ? (
        <ScheduleTable scheduleData={arrivalsData} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Arrivals;
