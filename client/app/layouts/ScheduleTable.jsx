import TableEntry from '../components/TableEntry';
import TableHeader from '../components/TableHeader';
import Button from '../components/Button';

const ScheduleTable = ({ scheduleData }) => {
  const flightData =
    scheduleData.data.airport.pluginData.schedule.arrivals.data;

  return (
    <div className='flex flex-col gap-[24px]'>
      <table className='grid w-[100%]'>
        <TableHeader />
        <Button
          styles={
            'text-[14px] leading-[20px] text-[#4D4D4D] px-[12px] py-[14px] flex justify-center items-center border-b-[1px] border-[#E6E6E6] h-[58px] font-[600]'
          }
        >
          Load earlier data
        </Button>
        {flightData.map((entry, index) => (
          <TableEntry entry={entry} key={index} />
        ))}
      </table>
      {/* <Pagination /> */}
    </div>
  );
};

export default ScheduleTable;
