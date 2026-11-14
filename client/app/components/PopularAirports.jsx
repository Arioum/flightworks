import { Link } from '@remix-run/react';

// Quick links to well-known airports. Each opens the airport page directly
// (one search's worth of API requests, only when clicked).
const AIRPORTS = [
  { iata: 'DXB', city: 'Dubai' },
  { iata: 'LHR', city: 'London' },
  { iata: 'SIN', city: 'Singapore' },
  { iata: 'JFK', city: 'New York' },
  { iata: 'CDG', city: 'Paris' },
  { iata: 'BLR', city: 'Bengaluru' },
];

const PopularAirports = ({ className = '' }) => (
  <ul className={`flex flex-wrap gap-[8px] ${className}`}>
    {AIRPORTS.map(({ iata, city }) => (
      <li key={iata}>
        <Link
          to={`/schedule/${iata}`}
          className='inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-full border-[1px] border-[#E6E6E6] bg-[#fff] text-[14px] text-[#4D4D4D] hover:border-[#6c63ff] hover:text-[#6c63ff] transition-colors'
        >
          <span className='font-[700] text-[#202020]'>{iata}</span>
          {city}
        </Link>
      </li>
    ))}
  </ul>
);

export default PopularAirports;
