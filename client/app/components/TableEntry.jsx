const TableEntry = ({ entry, currentRoute }) => {
  const { flight } = entry;
  const arrivalTime = new Date(flight.time.scheduled.arrival * 1000);
  // arrivalTime.toDateString()
  const airlineName = flight.airline.name;
  const { callsign, number } = flight.identification;
  const { logo, name = '' } = flight.owner || {};
  const { text, icon } = flight.status;

  const { code, position } =
    currentRoute === 'arrivals'
      ? flight.airport.origin
      : flight.airport.destination;

  return (
    <tr className='text-[14px] leading-[20px] text-[#4D4D4D] px-[12px] py-[8px] grid gap-[40px] grid-cols-5 border-b-[1px] border-[#E6E6E6] h-[48px] font-[500]'>
      <td className='text-[#146EB4] font-[500]'>
        {arrivalTime.toTimeString().slice(0, 5)}
      </td>
      <td>{number.default}</td>
      <td>
        {position.region.city}
        <span className='text-[#146EB4]'>({code.iata})</span>
      </td>
      <td className='flex grow justify-start items-center max-h-[30px]'>
        {logo ? (
          <img src={logo} alt={name} className='max-w-[60px] max-h-[100%]' />
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
