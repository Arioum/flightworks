import { FiInfo } from 'react-icons/fi';

const TableHeader = () => {
  return (
    <tr className='bg-[#F2F2F2] text-[14px] leading-[20px] text-[#4D4D4D] px-[10px] py-[12px] grid gap-[40px] grid-cols-5 rounded-[4px]'>
      <th className='flex grow font-[500]'>Time</th>
      <th className='flex grow font-[500] gap-[4px] items-center'>
        Flight
      </th>
      <th className='flex grow justify-start font-[500]'>From</th>
      <th className='flex grow justify-start font-[500]'>Airline</th>
      <th className='flex grow justify-end font-[500] gap-[4px] items-center'>
        Status
        <button className='hover:cursor-pointer group'>
          <FiInfo />
          <span className='group-hover:opacity-100 transition-opacity px-[8px] py-[4px] text-[12px] leading-[16px] text-[#fff] font-[400] rounded-[4px] w-[294px] max-h-fit absolute translate-y-[15px] translate-x-[-280px] opacity-0 bg-[#4D4D4D] text-left'>
            The data is provided as is, there are no guarantees that the
            information is fully correct or up to date. Changes and errors may
            occur.
          </span>
        </button>
      </th>
    </tr>
  );
};

export default TableHeader;
