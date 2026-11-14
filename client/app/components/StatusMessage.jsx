import PopularAirports from './PopularAirports';

// Explains why airport data couldn't be shown. kind comes from
// useAirportResource ('notFound' | 'limit' | 'auth' | 'error').
const COPY = {
  notFound: {
    title: (iata) => `No airport found for “${iata}”`,
    body: 'Check the 3-letter IATA code and try again, or pick one of these:',
    suggestions: true,
  },
  limit: {
    title: () => 'Live data is paused',
    body: 'FlightWorks is a personal project on free API plans, and it has used up its requests for now. Please try again later.',
    retry: true,
  },
  auth: {
    title: () => "Live data isn't available right now",
    body: 'The data provider refused the request. Please try again later. (Running this site? Check the RapidAPI keys in client/.env.)',
    retry: true,
  },
  error: {
    title: () => "Couldn't load this data",
    body: 'Check your connection and try again.',
    retry: true,
  },
};

const StatusMessage = ({ kind, iata, onRetry, compact = false }) => {
  const copy = COPY[kind] ?? COPY.error;
  return (
    <section
      role='alert'
      className={`flex flex-col items-start gap-[12px] ${compact ? 'py-[24px]' : 'py-[48px]'}`}
    >
      <h2 className='text-[22px] leading-[30px] font-[700] text-[#202020]'>
        {copy.title(iata)}
      </h2>
      <p className='text-[15px] text-[#4D4D4D] max-w-[560px]'>{copy.body}</p>
      {copy.suggestions && <PopularAirports />}
      {copy.retry && onRetry && (
        <button
          type='button'
          onClick={onRetry}
          className='mt-[4px] px-[16px] py-[8px] rounded-[8px] bg-[#202020] text-[#fff] text-[14px] font-[600] hover:bg-[#000]'
        >
          Try again
        </button>
      )}
    </section>
  );
};

export default StatusMessage;
