import { useEffect } from 'react';
import { Outlet, useLocation, useLoaderData } from '@remix-run/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { airportDetailsAtom } from '../store/atom/airport';
import axios from 'axios';
import AirportHeader from '../layouts/AirportHeader';
import AirportTabs from '../layouts/AirportTabs';
import GeneralTab from '../layouts/GeneralTab';
import Loader from '../components/Loader';

export const loader = async ({ req, params }) => {
  const apiKey = process.env.RAPID_API_KEY_FR24;
  return apiKey;
};

const SchedulePage = () => {
  const apiKey = useLoaderData();
  const setAirportData = useSetRecoilState(airportDetailsAtom);
  const airportData = useRecoilValue(airportDetailsAtom);

  const { pathname } = useLocation();
  const activeIata = pathname.split('/')[2];

  const isGeneralRoute = pathname === `/schedule/${activeIata}`;

  useEffect(() => {
    async function getAiportDetails() {
      await axios
        .request({
          method: 'GET',
          url: 'https://flightradar24-com.p.rapidapi.com/airports/detail',
          params: { airport_id: `${activeIata}` },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'flightradar24-com.p.rapidapi.com',
          },
        })
        .then((res) => {
          setAirportData(res.data);
        })
        .catch((err) => console.log(err));
    }
    getAiportDetails();
  }, []);

  return (
    <main className='content-wrapper md:px-[1em]'>
      {airportData ? (
        <>
          <AirportHeader airportData={airportData} key={pathname} />
          <section className='mb-[2em]'>
            <AirportTabs
              activeIata={activeIata}
              isGeneralRoute={pathname === `/schedule/${activeIata}`}
              isArrivalsRoute={pathname === `/schedule/${activeIata}/arrivals`}
              isDeparturesRoute={
                pathname === `/schedule/${activeIata}/departures`
              }
            />
            {isGeneralRoute && <GeneralTab airportDetails={airportData} />}
            <Outlet context={activeIata} />
          </section>
        </>
      ) : (
        <section>
          <Loader />
        </section>
      )}
    </main>
  );
};

export default SchedulePage;
