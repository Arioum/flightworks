import LoaderGif from '../assets/loader.gif';

const Loader = () => {
  return (
    <div className='flex flex-col items-center'>
      <img src={LoaderGif} alt='loader' width={40} />
      <p className='text-[2rem] font-[700]'>Loading</p>
    </div>
  );
};

export default Loader;
