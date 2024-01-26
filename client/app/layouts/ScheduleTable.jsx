import TableEntry from '../components/TableEntry';
import TableHeader from '../components/TableHeader';
import Button from '../components/Button';
import loadEarlierData from '../arrival-loadmore-data.json';
import { useState, useEffect } from 'react';

const ScheduleTable = ({ scheduleData }) => {
  const [earlierData, setEarlierData] = useState(null);
  const [loading, setLoading] = useState(false);

  const flightData =
    scheduleData.data.airport.pluginData.schedule.arrivals.data;
  const loadEarlier =
    loadEarlierData.data.airport.pluginData.schedule.arrivals.data;

  const handleLoadEarlierData = () => {
    setLoading(true);
    const reversedArray = loadEarlier.slice().reverse();
    setEarlierData(reversedArray);
    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-[24px]'>
      <table className='grid w-[100%]'>
        <TableHeader />
        {!earlierData && (
          <Button
            styles={
              'text-[14px] leading-[20px] text-[#4D4D4D] px-[12px] py-[14px] flex justify-center items-center border-b-[1px] border-[#E6E6E6] h-[58px] font-[600]'
            }
            onClick={handleLoadEarlierData}
          >
            {loading ? 'Loading....' : 'Load earlier data'}
          </Button>
        )}
        {earlierData &&
          earlierData.map((entry, index) => (
            <TableEntry entry={entry} key={index} />
          ))}
        {flightData.map((entry, index) => (
          <TableEntry entry={entry} key={index} />
        ))}
      </table>
    </div>
  );
};

export default ScheduleTable;
