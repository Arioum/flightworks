import PopularAirports from '../components/PopularAirports';

const HeroSection = () => {
  return (
    <section className='content-wrapper grid grid-cols-2 items-center gap-[48px] py-[88px] lg:py-[56px] md:grid-cols-1 md:gap-[24px] md:py-[32px]'>
      <div className='flex flex-col gap-[20px] md:order-2'>
        <h1 className='text-5xl font-[800] leading-[1.15] tracking-[-0.02em] text-[#202020] lg:text-4xl'>
          Airport arrivals, departures and info, worldwide
        </h1>
        <p className='text-[18px] leading-[28px] text-[#4D4D4D] md:text-[16px]'>
          Search any airport by its 3-letter code in the bar above, or start
          with one of these:
        </p>
        <PopularAirports />
        <p className='text-[13px] text-[#808080] md:hidden'>
          Tip: press{' '}
          <kbd className='px-[6px] rounded-[4px] border-[1px] border-[#DADADA] text-[11px] font-[600]'>
            /
          </kbd>{' '}
          anywhere to jump to search.
        </p>
      </div>
      <div className='max-w-[36em] w-full mx-auto'>
        <img src='/assets/hero.svg' alt='' className='w-full' />
      </div>
    </section>
  );
};

export default HeroSection;
