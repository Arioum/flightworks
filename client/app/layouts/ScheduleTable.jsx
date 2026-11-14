import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { apiLimitAtom } from '../store/atom/status';
import { errorKind } from '../utils/api';
import TableEntry from '../components/TableEntry';
import TableHeader from '../components/TableHeader';
import Button from '../components/Button';
import {
  mergeEarlierFlights,
  parseEarlierFlights,
} from '../utils/earlierFlights';
import { airportSides, withDayBreaks } from '../utils/flightFormat';

// Full-width row marking the start of a new day (airport local date).
const DayBreakRow = ({ label }) => (
  <tr className='grid grid-cols-1 bg-[#F7F7FF]'>
    <td className='px-[12px] py-[10px] text-[13px] leading-[18px] font-[700] text-[#202020] border-b-[1px] border-[#E6E6E6] flex items-center gap-[8px]'>
      {label.relative && (
        <span className='px-[8px] py-[1px] rounded-full bg-[#6c63ff] text-[#fff] text-[11px] leading-[16px] font-[600]'>
          {label.relative}
        </span>
      )}
      {label.text}
    </td>
  </tr>
);

const rowStyles =
  'w-[100%] text-[14px] leading-[20px] text-[#4D4D4D] px-[12px] py-[14px] flex justify-center items-center border-b-[1px] border-[#E6E6E6] h-[58px] font-[600]';

// mode: 'arrivals' | 'departures'. airportId: IATA code. apiKey: RapidAPI key.
const ScheduleTable = ({ scheduleData, mode, airportId, apiKey }) => {
  const [earlierData, setEarlierData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Accordion: key of the one expanded flight row, or null.
  const [openKey, setOpenKey] = useState(null);
  const setLimited = useSetRecoilState(apiLimitAtom);

  // Each click is one API request, for the next page of earlier flights.
  const handleLoadEarlierData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.request({
        method: 'GET',
        url: `https://flightradar24-com.p.rapidapi.com/airports/${mode}/load-earlier-flights`,
        params: { airport_id: airportId, page: nextPage },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'flightradar24-com.p.rapidapi.com',
        },
      });
      setLimited(false);
      const parsed = parseEarlierFlights(res.data, mode, nextPage);
      if (!parsed) throw new Error('Unexpected load-earlier-flights response');

      setEarlierData((prev) =>
        mergeEarlierFlights(prev, parsed.flights, scheduleData, mode)
      );
      setHasMore(parsed.hasMore);
      setNextPage(parsed.nextPage);
    } catch (err) {
      console.error(err);
      if (errorKind(err) === 'limit') {
        setLimited(true);
        setError('Live data is paused for now (free API limit reached).');
      } else {
        setError("Couldn't load earlier flights. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Earlier flights first, then the main schedule, with a row at each new day.
  const items = withDayBreaks([...earlierData, ...scheduleData], mode);
  const tzAbbr = airportSides(scheduleData[0]?.flight, mode).here?.timezone?.abbr;

  return (
    <div className='flex flex-col gap-[24px]'>
      <table className='grid w-[100%]'>
        <thead>
          <TableHeader mode={mode} tzAbbr={tzAbbr} />
        </thead>
        <tbody className='grid grid-cols-1'>
          <tr className='grid grid-cols-1'>
            <td>
              {hasMore ? (
                <Button styles={rowStyles} onClick={handleLoadEarlierData}>
                  {loading ? 'Loading...' : 'Load earlier data'}
                </Button>
              ) : (
                <p className={rowStyles}>No earlier flights</p>
              )}
              {error && (
                <p className='text-[14px] text-[#c0392b] text-center py-[8px]'>
                  {error}
                </p>
              )}
            </td>
          </tr>
          {items.length === 0 && (
            <tr className='grid grid-cols-1'>
              <td className='px-[12px] py-[24px] text-center text-[14px] text-[#808080]'>
                No upcoming flights listed.
              </td>
            </tr>
          )}
          {items.map((item) =>
            item.type === 'day' ? (
              <DayBreakRow key={item.key} label={item.label} />
            ) : (
              <TableEntry
                key={item.key}
                entry={item.entry}
                currentRoute={mode}
                airportId={airportId}
                open={openKey === item.key}
                onToggle={() =>
                  setOpenKey((current) => (current === item.key ? null : item.key))
                }
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
