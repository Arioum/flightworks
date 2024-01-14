import { Link } from '@remix-run/react';

const Navbar = () => {
  return (
    <header className='content-wrapper'>
      <nav className='flex justify-between items-center h-[80px] md:h-[60px]'>
        <Link to={'/'}>
          <img src='assets/brand-logo.svg' alt='logo' className='w-[250px] md:w-[200px]' />
        </Link>

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
