import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet, useLocation } from '@remix-run/react';
import axios from 'axios';
import { airportAtom } from '../store/atom/airport';
import AirportHeader from '../layouts/AirportHeader';
import AirportTabs from '../layouts/AirportTabs';
import GeneralTab from '../layouts/GeneralTab';
import airportData from '../airportDetails.json';

const SchedulePage = () => {
  const airport = useRecoilValue(airportAtom);
  // const setAirportData = useSetRecoilState()

  const { pathname } = useLocation();
  const activeIata = pathname.split('/')[2];
  const isGeneralRoute = pathname === `/schedule/${activeIata}`;
  const isArrivalsRoute = pathname === `/schedule/${activeIata}/arrivals`;
  const isDeparturesRoute = pathname === `/schedule/${activeIata}/departures`;

  const airportInfo = airportData.data.airport.pluginData;
  const img = airportInfo.details.airportImages.medium[0].src;

  // const options = {
  //   method: 'GET',
  //   url: 'https://flightradar24-com.p.rapidapi.com/airports/search',
  //   params: {q: 'New York'},
  //   headers: {
  //     'X-RapidAPI-Key': 'd10a8fae0fmsh6f4a5491a8f4badp1ad914jsn45a60477551c',
  //     'X-RapidAPI-Host': 'flightradar24-com.p.rapidapi.com'
  //   }
  // };

  // try {
  //   const response = await axios.request(options);
  //   console.log(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <main className='content-wrapper md:px-[1em]'>
      <AirportHeader airport={airport} img={img} />
      <section className='mb-[2em]'>
        <AirportTabs
          activeIata={activeIata}
          isGeneralRoute={isGeneralRoute}
          isArrivalsRoute={isArrivalsRoute}
          isDeparturesRoute={isDeparturesRoute}
        />
        {isGeneralRoute && <GeneralTab airportDetails={airportData} />}
        <Outlet />
      </section>
    </main>
  );
};

export default SchedulePage;
