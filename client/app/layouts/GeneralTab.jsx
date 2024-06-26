import LabelCards from '../components/LabelCards';

const GeneralTab = ({airportDetails}) => {
  const airport = airportDetails.data.airport.pluginData;
  const onGround = airport.aircraftCount.ground;
  const elevation = airport.details.position.elevation;
  const wiki = airport.details.url.wikipedia;
  const routes = airport.scheduledRoutesStatistics;
  const runways = airport.runways;
  const weather = airport.weather;

  return (
    <section className='rounded-[10px] overflow-hidden grid  place-items-start grid-cols-3 md:grid-cols-1 gap-[1em]'>
      <div className='w-[100%] max-h-fit '>
        <LabelCards className={'grid grid-cols-2 gap-[.6em]'}>
          <div>
            <h4 className='font-[700]'>Airports served</h4>
            <p>{routes.airportsServed}</p>
          </div>
          <div>
            <h4 className='font-[700]'>Countries served</h4>
            <p>{routes.countriesServed}</p>
          </div>
          <div>
            <h4 className='font-[700]'>Top Route</h4>
            <p>
              {routes.topRoute.from} → {routes.topRoute.to} (
              {routes.topRoute.count})
            </p>
          </div>
          <div>
            <h4 className='font-[700]'>Total Flights</h4>
            <p>{routes.airportsServed}</p>
          </div>
        </LabelCards>
      </div>

      <div className='w-[100%] max-h-fit'>
        <LabelCards className={'grid grid-cols-2 gap-[.6em]'}>
          <div>
            <h4 className='font-[700]'>Dew point</h4>
            <p>
              {weather.dewpoint.celsius}°C | {weather.dewpoint.fahrenheit}°F
            </p>
          </div>
          <div>
            <h4 className='font-[700]'>Temperature</h4>
            <p>
              {weather.temp.celsius}°C | {weather.temp.fahrenheit}°F
            </p>
          </div>
          <div>
            <h4 className='font-[700]'>Humidity</h4>
            <p>{weather.humidity}</p>
          </div>
          <div>
            <h4 className='font-[700]'>Pressure</h4>
            <p>
              {weather.pressure.hg}hg | {weather.pressure.hpa}hpa
            </p>
          </div>
        </LabelCards>
      </div>

      <div className='w-[100%] max-h-fit'>
        <LabelCards className={'grid grid-cols-2 gap-[.6em]'}>
          <div>
            <h4 className='font-[700]'>Skies</h4>
            <p>{weather.sky.condition.text}</p>
          </div>
          <div>
            <h4 className='font-[700]'>Visibility</h4>
            <p>
              {weather.sky.visibility.mi}miles | {weather.sky.visibility.nmi}nm
            </p>
          </div>
          <div>
            <h4 className='font-[700]'>Winds</h4>
            <p className='flex items-center'>
              {weather.wind.direction.text} {weather.wind.direction.degree}°
            </p>
          </div>
          <div>
            <h4 className='font-[700]'>Speed</h4>
            <p>
              {weather.wind.speed.kmh}kmh | {weather.wind.speed.kts}kts |{' '}
              {weather.wind.speed.mph}mph
            </p>
          </div>
        </LabelCards>
      </div>

      <div className='w-[100%] max-h-fit'>
        <LabelCards className={'grid grid-cols-1 gap-[.6em]'}>
          <div>
            <h4 className='font-[700]'>QNH</h4>
            <p>{weather.qnh}</p>
          </div>
          <div>
            <h4 className='font-[700]'>METAR</h4>
            <p>{weather.metar}</p>
          </div>
        </LabelCards>
      </div>

      <div className='w-[100%] max-h-fit'>
        <LabelCards className={'grid grid-cols-1 gap-[.6em]'}>
          <h4 className='font-[700]'>Runways</h4>
          {runways.map((runway, index) => (
            <div key={index} className='grid grid-cols-2'>
              <h4 className='font-[600]'>RWY {runway.name}</h4>
              <div>
                <div>
                  <h4 className='font-[600]'>Length</h4>
                  <p>
                    {runway.length.ft}ft / {runway.length.m}mtr
                  </p>
                </div>
                <div>
                  <h4 className='font-[600]'>Surface</h4>
                  <p>{runway.surface.name}</p>
                </div>
              </div>
            </div>
          ))}
        </LabelCards>
      </div>

      <div className='w-[100%] max-h-fit'>
        <LabelCards className={'grid grid-cols-1 gap-[.6em]'}>
          <h4 className='font-[700]'>Arial View</h4>
          <img
            src={airport.satelliteImage}
            alt='airport-arial-view'
            className='rounded-[14px] w-[100%]'
          />
        </LabelCards>
      </div>
    </section>
  );
};

export default GeneralTab;
