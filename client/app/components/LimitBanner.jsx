import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FiX } from 'react-icons/fi';
import { apiLimitAtom } from '../store/atom/status';

// Site-wide notice shown after the API refuses a request for hitting the free
// plan's limit. The limit belongs to the site's API key, so it affects every
// visitor; this browser just learns about it from its own request.
const LimitBanner = () => {
  const limited = useRecoilValue(apiLimitAtom);
  const [dismissed, setDismissed] = useState(false);
  if (!limited || dismissed) return null;

  return (
    <div role='status' className='bg-[#FFF4D6] border-b-[1px] border-[#F2DFA5] text-[#5C4400]'>
      <div className='content-wrapper py-[10px] flex items-start justify-between gap-[12px] text-[14px] leading-[20px] md:px-[1em]'>
        <p>
          <strong className='font-[700]'>Live data is paused.</strong> FlightWorks
          is a personal project on free API plans and has used up its requests
          for now. Anything already loaded still works.
        </p>
        <button
          type='button'
          onClick={() => setDismissed(true)}
          aria-label='Dismiss notice'
          className='shrink-0 mt-[2px] text-[#5C4400] hover:text-[#000]'
        >
          <FiX aria-hidden='true' />
        </button>
      </div>
    </div>
  );
};

export default LimitBanner;
