// One label/value pair inside a <dl>; renders nothing when the value is empty,
// so cards only show fields the API actually returned.
const Detail = ({ label, children, className = '' }) =>
  children || children === 0 ? (
    <div className={`flex flex-col gap-[4px] ${className}`}>
      <dt className='text-[12px] leading-[16px] text-[#808080] font-[500]'>
        {label}
      </dt>
      <dd className='text-[14px] leading-[21px] text-[#202020] font-[600] break-words'>
        {children}
      </dd>
    </div>
  ) : null;

// Shared spacing for the <dl> grids that hold Details.
export const detailGrid = 'grid gap-x-[24px] gap-y-[20px]';

export default Detail;
