import { Link } from '@remix-run/react';
import { memo } from 'react';
import BrandLogo from '../assets/brand-logo.svg';
import AirportSearch from './AirportSearch';

// Lean top bar: logo + airport search. Secondary links live in the footer.
// z-index sits above Leaflet's map controls (z-index 1000).
const Navbar = memo(() => {
  return (
    <header className='sticky top-0 z-[1100] bg-[#fff]/95 backdrop-blur border-b-[1px] border-[#EDEDED]'>
      <nav className='content-wrapper flex items-center justify-between gap-[24px] h-[64px] md:h-auto md:py-[12px] md:flex-wrap md:gap-[12px]'>
        <Link to='/' aria-label='FlightWorks home' className='shrink-0'>
          <img src={BrandLogo} alt='FlightWorks' className='w-[170px] md:w-[140px]' />
        </Link>
        <AirportSearch className='w-[340px] md:w-full' />
      </nav>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
