import Detail, { detailGrid } from '../components/Detail';
import PhotoCredit from '../components/PhotoCredit';
import SatelliteMap from '../components/SatelliteMap.client';
import { formatTime } from '../utils/flightFormat';
import { useHydrated } from '../utils/useHydrated';

// Map center: the point FR24's static image used, else the airport's
// coordinates. Returns [lat, lng] or null.
function getMapCenter(pluginData) {
  const center = pluginData?.satelliteImageProperties?.center;
  if (Array.isArray(center) && center.length === 2) return center;
  const { latitude, longitude } = pluginData?.details?.position ?? {};
  return typeof latitude === 'number' && typeof longitude === 'number'
    ? [latitude, longitude]
    : null;
}

const Card = ({ title, children, className = '' }) => (
  <section
    className={`w-full rounded-[14px] border-[1px] border-[#E6E6E6] bg-[#fff] p-[20px] flex flex-col gap-[16px] ${className}`}
  >
    <h2 className='text-[12px] font-[700] uppercase tracking-[.06em] text-[#6c63ff]'>
      {title}
    </h2>
    {children}
  </section>
);

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='px-[12px] py-[6px] rounded-full border-[1px] border-[#E6E6E6] text-[13px] font-[600] text-[#202020] hover:border-[#6c63ff] hover:text-[#6c63ff] transition-colors'
  >
    {children}
  </a>
);

const join = (...parts) => parts.filter((part) => part || part === 0).join(' | ');
const unit = (value, suffix) => (value || value === 0 ? `${value}${suffix}` : null);

// pluginData: FR24 airport detail. info: Airport Info API result (address,
// phone) or null. Every field is optional; empty cards and fields are hidden.
//
// Layout: two independent column stacks (left 2/3, right 1/3) so cards of
// different heights never leave a gap in the middle of the page.
const GeneralTab = ({ pluginData, info }) => {
  const hydrated = useHydrated(); // SatelliteMap is browser-only
  const details = pluginData?.details;
  const tz = details?.timezone;
  const routes = pluginData?.scheduledRoutesStatistics;
  const weather = pluginData?.weather;
  const runways = Array.isArray(pluginData?.runways) ? pluginData.runways : [];
  const photos = (details?.airportImages?.large ?? []).filter((photo) => photo?.src);
  const mapCenter = getMapCenter(pluginData);
  const mapZoom = pluginData?.satelliteImageProperties?.zoom ?? 14;
  const links = details?.url ?? {};
  const phoneHref = info?.phone ? `tel:${info.phone.replace(/[^+\d]/g, '')}` : null;
  const mapsHref = mapCenter
    ? `https://www.google.com/maps/@${mapCenter[0]},${mapCenter[1]},15z`
    : null;

  const airportCard = (
    <Card title='Airport'>
      <dl className={`${detailGrid} grid-cols-2`}>
        <Detail label='Location' className='col-span-2'>
          {info?.location ??
            [details?.position?.region?.city, details?.position?.country?.name]
              .filter(Boolean)
              .join(', ')}
        </Detail>
        <Detail label='District / county'>{info?.county}</Detail>
        <Detail label='State'>{info?.state}</Detail>
        <Detail label='Postal code'>{info?.postal_code}</Detail>
        <Detail label='Time zone'>{tz && join(tz.abbr, tz.name)}</Detail>
        <Detail label='Phone' className='col-span-2'>
          {phoneHref && (
            <a href={phoneHref} className='text-[#146EB4] hover:underline'>
              {info.phone}
            </a>
          )}
        </Detail>
      </dl>
      {(mapsHref || links.wikipedia || links.homepage || links.webcam) && (
        <div className='flex flex-wrap gap-[8px] mt-auto pt-[4px]'>
          {mapsHref && <ExternalLink href={mapsHref}>Google Maps</ExternalLink>}
          {links.homepage && <ExternalLink href={links.homepage}>Website</ExternalLink>}
          {links.wikipedia && <ExternalLink href={links.wikipedia}>Wikipedia</ExternalLink>}
          {links.webcam && <ExternalLink href={links.webcam}>Webcam</ExternalLink>}
        </div>
      )}
    </Card>
  );

  const trafficCard = routes && (
    <Card title='Traffic'>
      <dl className={`${detailGrid} grid-cols-2`}>
        <Detail label='Airports served'>{routes.airportsServed}</Detail>
        <Detail label='Countries served'>{routes.countriesServed}</Detail>
        <Detail label='Total flights'>{routes.totalFlights}</Detail>
        <Detail label='Aircraft on ground'>{pluginData?.aircraftCount?.ground}</Detail>
        <Detail label='Top route' className='col-span-2'>
          {routes.topRoute?.from &&
            `${routes.topRoute.from} → ${routes.topRoute.to} (${routes.topRoute.count})`}
        </Detail>
      </dl>
    </Card>
  );

  const weatherCard = weather && (
    <Card title='Weather'>
      <dl className={`${detailGrid} grid-cols-4 lg:grid-cols-3 md:grid-cols-2`}>
        <Detail label='Conditions'>{weather.sky?.condition?.text}</Detail>
        <Detail label='Temperature'>
          {join(unit(weather.temp?.celsius, '°C'), unit(weather.temp?.fahrenheit, '°F'))}
        </Detail>
        <Detail label='Dew point'>
          {join(unit(weather.dewpoint?.celsius, '°C'), unit(weather.dewpoint?.fahrenheit, '°F'))}
        </Detail>
        <Detail label='Humidity'>{unit(weather.humidity, '%')}</Detail>
        <Detail label='Wind'>
          {join(
            [weather.wind?.direction?.text, unit(weather.wind?.direction?.degree, '°')]
              .filter(Boolean)
              .join(' '),
            unit(weather.wind?.speed?.kmh, ' km/h'),
            unit(weather.wind?.speed?.kts, ' kt')
          )}
        </Detail>
        <Detail label='Visibility'>
          {join(unit(weather.sky?.visibility?.mi, ' mi'), unit(weather.sky?.visibility?.nmi, ' nm'))}
        </Detail>
        <Detail label='Pressure'>
          {join(unit(weather.pressure?.hpa, ' hPa'), unit(weather.pressure?.hg, ' inHg'))}
        </Detail>
        <Detail label='QNH'>{weather.qnh}</Detail>
        <Detail label='METAR' className='col-span-4 lg:col-span-3 md:col-span-2'>
          {weather.metar && <code className='font-[500] text-[13px]'>{weather.metar}</code>}
        </Detail>
      </dl>
      {weather.time && (
        <p className='text-[12px] text-[#808080]'>
          Observed {formatTime(weather.time, tz)}
          {tz?.abbr ? ` ${tz.abbr}` : ''}
        </p>
      )}
    </Card>
  );

  const mapCard = mapCenter && (
    <Card title='Aerial view'>
      {hydrated ? (
        <SatelliteMap center={mapCenter} zoom={mapZoom} />
      ) : (
        <div className='h-[285px] w-[100%] rounded-[14px] bg-[#EDEDED]' />
      )}
    </Card>
  );

  const runwaysCard = runways.length > 0 && (
    <Card title='Runways'>
      <ul className='flex flex-col divide-y-[1px] divide-[#EDEDED]'>
        {runways.map((runway, index) => (
          <li
            key={runway.name ?? index}
            className='flex justify-between gap-[12px] py-[12px] first:pt-0 last:pb-0'
          >
            <span className='text-[14px] font-[700] text-[#202020]'>RWY {runway.name}</span>
            <span className='text-[14px] text-[#4D4D4D] text-right'>
              {join(
                runway.length?.ft && `${runway.length.ft} ft / ${runway.length.m} m`,
                runway.surface?.name
              )}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );

  // Only worth a card when there's more than the one photo in the header.
  const photosCard = photos.length > 1 && (
    <Card title='Photos'>
      <ul className='grid grid-cols-2 gap-[12px]'>
        {photos.map((photo) => (
          <li key={photo.src} className='flex flex-col gap-[6px]'>
            <img src={photo.src} alt='Airport' className='w-full rounded-[8px] object-cover aspect-[4/3]' />
            <PhotoCredit photo={photo} className='text-[#808080]' />
          </li>
        ))}
      </ul>
    </Card>
  );

  return (
    <div className='grid grid-cols-3 lg:grid-cols-1 gap-[16px] items-start'>
      <div className='col-span-2 lg:col-span-1 flex flex-col gap-[16px]'>
        <div className={`grid gap-[16px] ${trafficCard ? 'grid-cols-2 md:grid-cols-1' : 'grid-cols-1'}`}>
          {airportCard}
          {trafficCard}
        </div>
        {weatherCard}
      </div>
      <div className='flex flex-col gap-[16px] lg:grid lg:grid-cols-2 lg:items-start md:grid-cols-1'>
        {mapCard}
        {runwaysCard}
        {photosCard}
      </div>
    </div>
  );
};

export default GeneralTab;
