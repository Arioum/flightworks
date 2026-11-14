import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import FlightDetails from './FlightDetails';
import {
  airportSides,
  formatTime,
  scheduledTime,
  statusColor,
} from '../utils/flightFormat';

// One flight row; click anywhere on it to show/hide FlightDetails.
// currentRoute: 'arrivals' | 'departures'. airportId: this page's IATA code.
// open/onToggle come from ScheduleTable, which keeps at most one row open.
const TableEntry = ({ entry, currentRoute, airportId, open, onToggle }) => {
  const rowRef = useRef(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const flight = entry?.flight ?? {};

  // Opening this row closes the previous one; if that was above and tall, this
  // row jumps up. Keep it on screen (scroll-mt clears the sticky navbar).
  useEffect(() => {
    if (open) rowRef.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  }, [open]);

  // When open, the row is tinted with an accent bar on its left edge, and
  // FlightDetails continues the same bar with a lighter tint, so the row and
  // its details read as one block distinct from the other rows.
  const { here, other } = airportSides(flight, currentRoute);

  // Scheduled time at this airport, in this airport's local time.
  const time = formatTime(scheduledTime(entry, currentRoute), here?.timezone) ?? '--:--';
  const number =
    flight.identification?.number?.default ?? flight.identification?.callsign ?? '—';
  const city = other?.position?.region?.city ?? other?.name ?? '—';
  const code = other?.code?.iata;
  const airlineName = flight.airline?.name ?? flight.owner?.name ?? '';
  const logo = flight.owner?.logo;

  return (
    <>
      <tr
        ref={rowRef}
        className={`relative scroll-mt-[96px] text-[14px] leading-[20px] px-[12px] py-[8px] grid items-center gap-[40px] md:gap-[12px] grid-cols-5 border-b-[1px] h-[48px] font-[500] ${
          open
            ? 'bg-[#EFEDFF] text-[#202020] border-[#EFEDFF] shadow-[inset_3px_0_0_#6c63ff]'
            : 'text-[#4D4D4D] border-[#E6E6E6] hover:bg-[#FAFAFA]'
        }`}
      >
        <td className='text-[#146EB4] font-[500]'>{time}</td>
        <td>{number}</td>
        <td>
          {city}
          {code && <span className='text-[#146EB4]'>({code})</span>}
        </td>
        <td className='flex grow justify-start items-center h-[30px] min-w-0'>
          {/* Logo comes from the operator (owner) and is often missing or a
              dead link; fall back to the airline name in both cases. */}
          {logo && !logoFailed ? (
            <img
              src={logo}
              alt={airlineName}
              title={airlineName}
              onError={() => setLogoFailed(true)}
              className='max-w-[60px] max-h-[100%]'
            />
          ) : (
            <span className='truncate font-[600] text-[#202020]' title={airlineName}>
              {airlineName || '—'}
            </span>
          )}
        </td>
        <td className='flex grow justify-end items-center gap-[8px]'>
          {flight.status?.live && (
            <span className='px-[6px] py-[1px] rounded-full bg-[#6c63ff] text-[#fff] text-[11px] leading-[16px] font-[600]'>
              Live
            </span>
          )}
          <span
            className='border-l-4 pl-[.6em]'
            style={{ borderLeftColor: statusColor(flight.status) }}
          >
            {flight.status?.text}
          </span>
          {/* The ::after overlay stretches this button over the whole row, so
              clicking anywhere on the row toggles the details. */}
          <button
            type='button'
            onClick={onToggle}
            aria-expanded={open}
            aria-label={`${open ? 'Hide' : 'Show'} details for flight ${number}`}
            className={`${open ? 'text-[#6c63ff]' : 'text-[#808080]'} after:absolute after:inset-0 after:content-['']`}
          >
            <FiChevronDown
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </td>
      </tr>
      {open && (
        <tr className='grid grid-cols-1'>
          <td>
            <FlightDetails
              flight={flight}
              mode={currentRoute}
              airportId={airportId}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default TableEntry;
