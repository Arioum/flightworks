import Button from '../components/Button';

const HeroSection = () => {
  return (
    <section className='content-wrapper grid grid-cols-2 py-[8em] md:grid-cols-1 md:gap-[2em]'>
      <div className='flex flex-col gap-6 md:order-2 md:items-center'>
        <h1 className='text-5xl font-[900] leading-[1.4] xl:text-4.5xl lg:text-4xl md:text-center'>
          Get status of airport and currents flight from around the world
        </h1>
        <Button
          variant={'secondary'}
          type={'link'}
          dest={'search'}
          styles='max-w-fit'
        >
          Search now!
        </Button>
      </div>
      <div className='max-w-[40em] flex mx-auto'>
        <img src='assets/hero.svg' alt='hero' />
      </div>
    </section>
  );
};

export default HeroSection;
