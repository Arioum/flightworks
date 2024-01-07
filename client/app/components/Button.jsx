import { Link } from '@remix-run/react';

const btnStyles = {
  primary: 'text-white rounded bg-black px-[4em] py-[1em]',
  secondary: 'text-white rounded bg-[#6c63ff] px-[4em] py-[1em]',
};

const Button = ({ type, dest, children, variant, styles }) => {
  if (type === 'link') {
    return (
      <Link to={`/${dest}`} className={`${btnStyles[variant]} ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${btnStyles[variant]} ${styles}`}>{children}</button>
  );
};

export default Button;
