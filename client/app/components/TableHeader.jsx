import { FiInfo } from 'react-icons/fi';

// mode: 'arrivals' | 'departures'. tzAbbr: the airport's time zone, e.g. "IST".
const TableHeader = ({ mode, tzAbbr }) => {
  return (
    <tr className='bg-[#F2F2F2] text-[14px] leading-[20px] text-[#4D4D4D] px-[10px] py-[12px] grid gap-[40px] md:gap-[12px] grid-cols-5 rounded-[4px]'>
      <th className='flex grow font-[500]'>
        Time{tzAbbr ? ` (${tzAbbr})` : ''}
      </th>
      <th className='flex grow font-[500] gap-[4px] items-center'>
        Flight
      </th>
      <th className='flex grow justify-start font-[500]'>
        {mode === 'departures' ? 'To' : 'From'}
      </th>
      <th className='flex grow justify-start font-[500]'>Airline</th>
      <th className='flex grow justify-end font-[500] gap-[4px] items-center'>
        Status
        <button
          type='button'
          aria-label='About flight status'
          className='hover:cursor-pointer group'
        >
          <FiInfo aria-hidden='true' />
          <span
            role='tooltip'
            className='group-hover:opacity-100 group-focus:opacity-100 transition-opacity px-[10px] py-[6px] text-[12px] leading-[17px] text-[#fff] font-[400] rounded-[6px] w-[280px] max-h-fit absolute translate-y-[15px] translate-x-[-266px] opacity-0 pointer-events-none bg-[#202020] text-left'
          >
            Live status from Flightradar24. It can lag behind or be wrong, so
            check with your airline before you travel.
          </span>
        </button>
      </th>
    </tr>
  );
};

export default TableHeader;
