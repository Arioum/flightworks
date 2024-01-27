import { useRecoilValue } from 'recoil';
import { airportAtom, airportImageSelector } from '../store/atom/airport';
import { FaLocationDot } from 'react-icons/fa6';

const AirportHeader = () => {
  const airport = useRecoilValue(airportAtom);
  const airportImage = useRecoilValue(airportImageSelector) || null;

  if (airportImage) {
    return (
      <section
        className={`max-w-[100%] rounded-[10px] p-[1em] mt-[1em] min-h-[200px] max-h-[330px] flex gap-[1em] justify-between items-center bg-[#202020] overflow-hidden ${
          airportImage ? 'md:flex-col' : 'md:flex-row md:justify-center'
        }`}
      >
        <div className='md:order-2'>
          <h1
            className='text-[2rem] text-[#fff] font-[700] md:text-[1.4rem]'
            suppressHydrationWarning={true}
          >
            {airport.name} ({airport.iata}/{airport.icao})
          </h1>
          <p className='text-[1.2rem] font-[600] flex items-center md:justify-center gap-[.4em] text-[#e2e2e2] md:text-[1rem]'>
            <FaLocationDot />
            {airport.location} ({airport.country_iso})
          </p>
        </div>
        {airportImage && (
          <img
            src={airportImage}
            alt='airport-image'
            className='relative right-0 max-h-[220px] overflow-hidden md:order-1 max-w-[100%] rounded-[6px]'
          />
        )}
      </section>
    );
  }
};

export default AirportHeader;
