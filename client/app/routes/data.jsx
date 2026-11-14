// "Data & usage": where the data comes from and how API requests are spent.
// (Replaces the separate /data and /usage pages; /usage redirects here.)

export const meta = () => [
  { title: 'Data & usage · FlightWorks' },
  {
    name: 'description',
    content: 'Where FlightWorks gets its airport and flight data, and how it uses its API quota.',
  },
];

const SOURCES = [
  {
    name: 'Flightradar24',
    via: 'RapidAPI · “Flightradar24 com”',
    href: 'https://rapidapi.com/things4u-api4upro/api/flightradar24-com',
    provides: [
      'Airport name, codes, photos and time zone',
      'Weather, runways and traffic stats',
      'Arrivals and departures, including earlier flights',
      'Per-flight aircraft, gates, terminals and times',
    ],
  },
  {
    name: 'Airport Info',
    via: 'RapidAPI · “Airport Info”',
    href: 'https://rapidapi.com/Active-api/api/airport-info',
    provides: ['Full location and postal address', 'Airport phone number'],
  },
];

// What each action costs, matching the caching in utils/useAirportResource
// and the max ages set on the airport page and schedule tabs.
const REQUESTS = [
  { action: 'Open an airport', cost: '1 Flightradar24 + 1 Airport Info', note: 'Free if it’s the airport you viewed last, within 15 minutes.' },
  { action: 'Search a code that doesn’t exist', cost: '1 Flightradar24', note: 'Airport Info is only asked once the airport is found.' },
  { action: 'Open Arrivals or Departures', cost: '1 Flightradar24', note: 'Free if opened again for the same airport within 5 minutes.' },
  { action: 'Click Refresh or Load earlier data', cost: '1 Flightradar24 per click', note: 'Only when you click.' },
  { action: 'Type in the search box', cost: 'None', note: 'Nothing is looked up until you press Enter.' },
];

const SectionTitle = ({ children }) => (
  <h2 className='text-[12px] font-[700] uppercase tracking-[.06em] text-[#6c63ff]'>
    {children}
  </h2>
);

const Data = () => {
  return (
    <main className='content-wrapper py-[48px] md:px-[1em] md:py-[32px] flex flex-col gap-[40px]'>
      <header className='flex flex-col gap-[12px] max-w-[720px]'>
        <p className='text-[13px] font-[700] uppercase tracking-[.06em] text-[#6c63ff]'>
          About
        </p>
        <h1 className='text-[2.25rem] leading-[1.2] font-[800] tracking-[-0.02em] text-[#202020] md:text-[1.75rem]'>
          Data &amp; usage
        </h1>
        <p className='text-[16px] leading-[26px] text-[#4D4D4D]'>
          FlightWorks is a personal project. It shows airport and flight
          information from two third-party APIs, so it can be delayed or
          wrong. Check with your airline or airport before you travel.
        </p>
      </header>

      <section className='flex flex-col gap-[16px]'>
        <SectionTitle>Data sources</SectionTitle>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-[16px]'>
          {SOURCES.map((source) => (
            <article
              key={source.name}
              className='rounded-[14px] border-[1px] border-[#E6E6E6] bg-[#fff] p-[20px] flex flex-col gap-[14px]'
            >
              <div>
                <h3 className='text-[20px] leading-[28px] font-[700] text-[#202020]'>
                  {source.name}
                </h3>
                <p className='text-[13px] text-[#808080]'>{source.via}</p>
              </div>
              <ul className='flex flex-col gap-[6px] text-[14px] leading-[20px] text-[#4D4D4D]'>
                {source.provides.map((item) => (
                  <li key={item} className='flex gap-[8px]'>
                    <span aria-hidden='true' className='text-[#6c63ff]'>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={source.href}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-auto self-start px-[12px] py-[6px] rounded-full border-[1px] border-[#E6E6E6] text-[13px] font-[600] text-[#202020] hover:border-[#6c63ff] hover:text-[#6c63ff] transition-colors'
              >
                View on RapidAPI ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-[16px]'>
        <SectionTitle>Usage limits</SectionTitle>
        <p className='text-[15px] leading-[24px] text-[#4D4D4D] max-w-[720px]'>
          Both APIs are used on free plans with monthly request limits, shared
          by everyone who visits. To stay within them, FlightWorks only makes a
          request when you ask for something, and reuses recent answers. If a
          limit is reached, the site shows “Live data is paused” until requests
          are available again.
        </p>
        <div className='rounded-[14px] border-[1px] border-[#E6E6E6] overflow-hidden'>
          <table className='w-full text-left text-[14px] leading-[20px]'>
            <thead className='bg-[#F7F7F7] text-[#4D4D4D]'>
              <tr>
                <th scope='col' className='px-[16px] py-[10px] font-[600]'>When you…</th>
                <th scope='col' className='px-[16px] py-[10px] font-[600]'>Requests</th>
                <th scope='col' className='px-[16px] py-[10px] font-[600] md:hidden'>Notes</th>
              </tr>
            </thead>
            <tbody className='divide-y-[1px] divide-[#EDEDED]'>
              {REQUESTS.map((row) => (
                <tr key={row.action} className='align-top'>
                  <th scope='row' className='px-[16px] py-[12px] font-[600] text-[#202020]'>
                    {row.action}
                  </th>
                  <td className='px-[16px] py-[12px] text-[#202020]'>
                    {row.cost}
                    <span className='hidden md:block text-[13px] text-[#808080] mt-[2px]'>
                      {row.note}
                    </span>
                  </td>
                  <td className='px-[16px] py-[12px] text-[#808080] md:hidden'>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Data;
