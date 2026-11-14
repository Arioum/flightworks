import Detail, { detailGrid } from './Detail';
import PhotoCredit, { firstPhoto } from './PhotoCredit';
import {
  formatDelay,
  formatDuration,
  formatTime,
} from '../utils/flightFormat';

// Expanded view of one flight. Shows only fields the API actually returned.

const Section = ({ title, children }) => (
  <div className='flex flex-col gap-[16px]'>
    <h5 className='text-[12px] font-[700] uppercase tracking-[.06em] text-[#6c63ff]'>
      {title}
    </h5>
    {children}
  </div>
);

// "Air India Express (IX/AXB)"
const withCodes = (name, code) => {
  const codes = [code?.iata, code?.icao].filter(Boolean).join('/');
  if (!name) return codes || null;
  return codes ? `${name} (${codes})` : name;
};

// "20:02 IST (+17 min)"
const timeText = (unix, tz, scheduled) => {
  const time = formatTime(unix, tz);
  if (!time) return null;
  const zone = tz?.abbr ? ` ${tz.abbr}` : '';
  const delay = scheduled && unix !== scheduled ? formatDelay(scheduled, unix) : null;
  return `${time}${zone}${delay ? ` (${delay})` : ''}`;
};

// Departure or arrival end of the flight.
function Endpoint({ title, airportLabel, airport, scheduled, actual, estimated, showBaggage }) {
  const tz = airport?.timezone;
  return (
    <Section title={title}>
      <dl className={`${detailGrid} grid-cols-2`}>
        <Detail label='Airport' className='col-span-2'>{airportLabel}</Detail>
        <Detail label='Scheduled'>{timeText(scheduled, tz)}</Detail>
        {actual ? (
          <Detail label='Actual'>{timeText(actual, tz, scheduled)}</Detail>
        ) : (
          <Detail label='Estimated'>{timeText(estimated, tz, scheduled)}</Detail>
        )}
        <Detail label='Terminal'>{airport?.info?.terminal}</Detail>
        <Detail label='Gate'>{airport?.info?.gate}</Detail>
        {showBaggage && <Detail label='Baggage belt'>{airport?.info?.baggage}</Detail>}
      </dl>
    </Section>
  );
}

// mode: 'arrivals' | 'departures'. airportId: IATA code of this page's airport,
// used as its label because the API omits this airport's name in the list.
const FlightDetails = ({ flight, mode, airportId }) => {
  const { origin, destination } = flight?.airport ?? {};
  const time = flight?.time ?? {};
  const { aircraft, identification, airline, owner, status } = flight ?? {};

  const label = (airport, isThisAirport) =>
    withCodes(airport?.name, airport?.code) ?? (isThisAirport ? airportId : null);

  const model = aircraft?.model?.text || aircraft?.model?.code;
  const codeshares = Array.isArray(identification?.codeshare)
    ? identification.codeshare.join(', ')
    : null;
  // The listed airline can be a livery or brand name; owner is the operator.
  const operator = owner?.name && owner.name !== airline?.name ? owner.name : null;
  // Aircraft photo, when the API includes one. Assumed to have the same shape
  // as the airport photos; the saved samples only ever had `images: null`.
  const photo = firstPhoto(aircraft?.images);

  return (
    // Same accent bar as the open row in TableEntry, lighter tint below it.
    <div className='px-[16px] py-[24px] bg-[#F8F7FF] shadow-[inset_3px_0_0_#6c63ff] border-b-[1px] border-[#DCD9FF] grid grid-cols-3 lg:grid-cols-1 gap-x-[40px] gap-y-[32px]'>
      <Section title='Flight'>
        {photo && (
          <figure className='flex flex-col gap-[6px]'>
            <img
              src={photo.src}
              alt={[model, aircraft?.registration].filter(Boolean).join(' ') || 'Aircraft'}
              className='w-full max-w-[320px] rounded-[8px] object-cover'
            />
            <PhotoCredit photo={photo} className='text-[#808080]' />
          </figure>
        )}
        <dl className={`${detailGrid} grid-cols-2`}>
          <Detail label='Airline'>{withCodes(airline?.name, airline?.code)}</Detail>
          <Detail label='Operated by'>{operator}</Detail>
          <Detail label='Aircraft'>{model}</Detail>
          <Detail label='Registration'>{aircraft?.registration}</Detail>
          <Detail label='Registered in'>{aircraft?.country?.name}</Detail>
          <Detail label='Mode-S code'>{aircraft?.hex?.toUpperCase()}</Detail>
          <Detail label='Callsign'>{identification?.callsign}</Detail>
          <Detail label='Also flies as'>{identification?.number?.alternative}</Detail>
          <Detail label='Codeshares' className='col-span-2'>{codeshares}</Detail>
          <Detail label='Flight time'>{formatDuration(time.other?.duration)}</Detail>
          <Detail label='Tracking'>{status?.live ? 'Live now' : null}</Detail>
        </dl>
      </Section>
      <Endpoint
        title='Departure'
        airportLabel={label(origin, mode === 'departures')}
        airport={origin}
        scheduled={time.scheduled?.departure}
        actual={time.real?.departure}
        estimated={time.estimated?.departure}
      />
      <Endpoint
        title='Arrival'
        airportLabel={label(destination, mode === 'arrivals')}
        airport={destination}
        scheduled={time.scheduled?.arrival}
        actual={time.real?.arrival}
        estimated={time.estimated?.arrival}
        showBaggage
      />
    </div>
  );
};

export default FlightDetails;
