import { Link } from '@remix-run/react';

const Navbar = () => {
  return (
    <header className='content-wrapper'>
      <nav className='flex justify-between items-center h-[80px] md:h-[60px]'>
        <div className='font-[700] text-2xl md:text-[1rem]'>
          <Link to={'/'}>FLIGHTWORKS</Link>
        </div>
        <ul className='flex gap-[5em] font-[600] text-[1rem] md:gap-[2em]'>
          <li>
            <Link to={'/data'}>Data</Link>
          </li>
          <li>
            <Link to={'/usage'}>Usage</Link>
          </li>
          <li>
            <Link to={'/contact'}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
