import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { FiSearch } from 'react-icons/fi';

const IATA_CODE = /^[A-Za-z]{3}$/;

// Navbar search: type a 3-letter IATA code and press Enter to open that
// airport's page. Nothing is fetched while typing (the APIs have small free
// quotas); the airport page does the lookup.
const AirportSearch = ({ className = '' }) => {
  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // "/" focuses the search from anywhere, unless the user is typing in a field.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const typing =
        target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '');
      if (typing) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const code = value.trim();
    if (!IATA_CODE.test(code)) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setValue('');
    inputRef.current?.blur();
    navigate(`/schedule/${code.toUpperCase()}`);
  };

  return (
    <form role='search' onSubmit={onSubmit} className={`relative ${className}`}>
      <label htmlFor='airport-search' className='sr-only'>
        Search airports by 3-letter IATA code
      </label>
      <FiSearch
        aria-hidden='true'
        className='absolute left-[12px] top-1/2 -translate-y-1/2 text-[#808080] pointer-events-none'
      />
      <input
        id='airport-search'
        ref={inputRef}
        type='search'
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (invalid) setInvalid(false);
        }}
        placeholder='Try DXB (Dubai)'
        maxLength={3}
        autoComplete='off'
        autoCapitalize='characters'
        spellCheck={false}
        aria-invalid={invalid}
        aria-describedby={invalid ? 'airport-search-error' : undefined}
        className={`w-full h-[40px] pl-[36px] pr-[40px] rounded-[10px] bg-[#F5F5F5] border-[1px] text-[14px] text-[#202020] font-[600] uppercase placeholder:normal-case placeholder:font-[500] placeholder:text-[#8C8C8C] outline-none focus:bg-[#fff] focus:border-[#6c63ff] transition-colors ${
          invalid ? 'border-[#E5484D]' : 'border-transparent'
        }`}
      />
      <kbd
        aria-hidden='true'
        className='absolute right-[10px] top-1/2 -translate-y-1/2 px-[6px] rounded-[4px] border-[1px] border-[#DADADA] text-[11px] leading-[18px] text-[#8C8C8C] font-[600] md:hidden'
      >
        /
      </kbd>
      {invalid && (
        <p
          id='airport-search-error'
          role='alert'
          className='absolute left-0 top-[calc(100%+6px)] z-[10] px-[10px] py-[6px] rounded-[6px] bg-[#202020] text-[#fff] text-[12px] whitespace-nowrap'
        >
          Enter a 3-letter airport code, like DXB
        </p>
      )}
    </form>
  );
};

export default AirportSearch;
