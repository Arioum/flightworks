import { useEffect, useState } from 'react';

const TableEntry = ({ entry }) => {
  const [date, setDate] = useState();
  const { flight } = entry;

  const arrivalTime = new Date(flight.time.scheduled.arrival * 1000);
  // arrivalTime.toDateString()
  const { code, position } = flight.airport.origin;
  const airlineName = flight.airline.name;
  const { callsign, number } = flight.identification;
  const { logo, name = '' } = flight.owner || {};
  const { text, icon } = flight.status;

  useEffect(() => {
    
  })

  return (
    <tr className='text-[14px] leading-[20px] text-[#4D4D4D] px-[12px] py-[14px] grid gap-[40px] grid-cols-5 border-b-[1px] border-[#E6E6E6] h-[48px] font-[500]'>
      <td className='text-[#146EB4] font-[500]'>
        {arrivalTime.toTimeString().slice(0, 5)}
      </td>
      <td>{number.default}</td>
      <td>
        {position.region.city}
        <span className='text-[#146EB4]'>({code.iata})</span>
      </td>
      <td className='flex grow justify-start items-center'>
        {logo ? (
          <img src={logo} alt={name} className='w-[60px] h-fit' />
        ) : (
          airlineName
        )}
      </td>
      <td className='flex grow justify-end items-center'>
        <span className={`border-l-4 pl-[.6em] border-[${icon}]`}>{text}</span>
      </td>
    </tr>
  );
};

export default TableEntry;
