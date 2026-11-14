import { FaLocationDot } from 'react-icons/fa6';
import PhotoCredit, { firstPhoto } from '../components/PhotoCredit';

// details: FR24 pluginData.details for this airport.
// info: Airport Info API result for the same airport, or null while it loads
// or if that API has no entry (it only adds the fuller location line).
const AirportHeader = ({ details, info }) => {
  const iata = details?.code?.iata;
  const icao = details?.code?.icao;
  const name = details?.name ?? info?.name;
  const city = details?.position?.region?.city;
  const country = details?.position?.country;
  const location = info?.location
    ? [info.location, info.country_iso && `(${info.country_iso})`].filter(Boolean).join(' ')
    : [city, country?.name].filter(Boolean).join(', ');
  const photo = firstPhoto(details?.airportImages);
  const image = photo?.src ?? null;

  return (
    <section
      className={`max-w-[100%] rounded-[14px] p-[24px] mt-[24px] min-h-[200px] max-h-[330px] flex gap-[24px] justify-between items-center bg-[#202020] overflow-hidden ${
        image ? 'md:flex-col md:max-h-none' : ''
      }`}
    >
      <div className='flex flex-col gap-[10px] md:order-2 md:w-full'>
        <div className='flex flex-wrap items-center gap-[8px]'>
          {iata && (
            <span className='px-[10px] py-[2px] rounded-[6px] bg-[#6c63ff] text-[#fff] text-[14px] font-[800] tracking-[.06em]'>
              {iata}
            </span>
          )}
          {icao && (
            <span className='px-[10px] py-[2px] rounded-[6px] bg-[#ffffff1f] text-[#e2e2e2] text-[14px] font-[700] tracking-[.06em]'>
              {icao}
            </span>
          )}
        </div>
        <h1 className='text-[2rem] leading-[1.2] text-[#fff] font-[700] md:text-[1.4rem]'>
          {name}
        </h1>
        {location && (
          <p className='text-[1.05rem] font-[600] flex items-center gap-[.4em] text-[#cfcfcf] md:text-[0.95rem]'>
            <FaLocationDot aria-hidden='true' />
            {location}
          </p>
        )}
      </div>
      {image && (
        <figure className='relative md:order-1 max-w-[100%] shrink-0'>
          <img
            src={image}
            alt={name ? `${name}` : 'Airport'}
            className='max-h-[220px] max-w-[100%] rounded-[8px] object-cover'
          />
          <PhotoCredit
            photo={photo}
            className='absolute right-[6px] bottom-[6px] px-[6px] py-[2px] rounded-[4px] bg-[#000000a6] text-[#fff]'
          />
        </figure>
      )}
    </section>
  );
};

export default AirportHeader;
