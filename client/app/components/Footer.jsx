import { Link } from '@remix-run/react';

const Footer = () => (
  <footer className='mt-[48px] border-t-[1px] border-[#EDEDED]'>
    <div className='content-wrapper py-[20px] flex items-center justify-between gap-[12px] text-[13px] leading-[18px] text-[#808080] md:flex-col md:items-start'>
      <p>
        A personal project. Data from Flightradar24 and Airport Info via
        RapidAPI, and it can be delayed or wrong.
      </p>
      <Link to='/data' className='font-[600] hover:text-[#202020]'>
        Data &amp; usage
      </Link>
    </div>
  </footer>
);

export default Footer;
