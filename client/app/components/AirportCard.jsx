const AirportCard = ({ airport }) => {
  console.log(airport);

  const { latitude, longitude } = airport;


  return (
    <section>
      <h1>{airport.name}</h1>
      <p>{airport.iata}</p>
      <p>{airport.icao}</p>
      <p>{airport.location}</p>
      <p>{airport.country}</p>
      <p>{airport.country_iso}</p>
      <p>{airport.county}</p>
      <p>{airport.state}</p>
      <p>{airport.phone}</p>
      <p>{airport.postal_code}</p>
      <p>{airport.uct}</p>
    </section>
  );
};

export default AirportCard;
