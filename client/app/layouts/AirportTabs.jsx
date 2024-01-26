import Button from '../components/Button';

const AirportTabs = ({
  activeIata,
  isGeneralRoute,
  isArrivalsRoute,
  isDeparturesRoute,
}) => {
  return (
    <div className='max-w-[100%] my-[1em] h-[60px] flex justify-start items-end bg-[#202020] overflow-hidden rounded-[10px] font-[600] text-[#000]'>
      <Button
        type={'link'}
        dest={`/schedule/${activeIata}`}
        styles={`h-[60px] w-[200px] text-[#fff] flex justify-center items-center border-b-4 border-b-[#202020] ${
          isGeneralRoute && 'border-b-[#6c63ff]'
        }`}
      >
        General
      </Button>
      <Button
        type={'link'}
        dest={`/schedule/${activeIata}/arrivals`}
        styles={`h-[60px] w-[200px] text-[#fff] flex justify-center items-center border-b-4 border-b-[#202020] ${
          isArrivalsRoute && 'border-b-[#6c63ff]'
        }`}
      >
        Arrivals
      </Button>
      <Button
        type={'link'}
        dest={`/schedule/${activeIata}/departures`}
        styles={`h-[60px] w-[200px] text-[#fff] flex justify-center items-center border-b-4 border-b-[#202020] ${
          isDeparturesRoute && 'border-b-[#6c63ff]'
        }`}
      >
        Departures
      </Button>
    </div>
  );
};

export default AirportTabs;
