import PopularAirports from '../components/PopularAirports';

const NotFound = () => {
  return (
    <main className='content-wrapper py-[64px] md:px-[1em] md:py-[40px]'>
      <section className='flex flex-col items-start gap-[12px]'>
        <p className='text-[13px] font-[700] uppercase tracking-[.06em] text-[#6c63ff]'>
          404
        </p>
        <h1 className='text-[2rem] leading-[1.2] font-[700]'>
          This page doesn&apos;t exist
        </h1>
        <p className='text-[15px] text-[#4D4D4D]'>
          Search for an airport above, or try one of these:
        </p>
        <PopularAirports />
      </section>
    </main>
  );
};

export default NotFound;
