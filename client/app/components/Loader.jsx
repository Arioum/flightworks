// Loading state with room around it, so it doesn't crowd the tabs above.
const Loader = ({ label = 'Loading…' }) => (
  <div
    role='status'
    aria-live='polite'
    className='flex flex-col items-center justify-center gap-[14px] py-[72px] md:py-[48px]'
  >
    <span
      aria-hidden='true'
      className='h-[32px] w-[32px] rounded-full border-[3px] border-[#E6E6E6] border-t-[#6c63ff] animate-spin'
    />
    <p className='text-[14px] font-[600] text-[#808080]'>{label}</p>
  </div>
);

export default Loader;
