const usage = () => {
  return (
    <main className='content-wrapper'>
      <h1 className='text-[1.8rem] mt-[2em] font-[500]'>Usage Limitatons</h1>
      <hr className='py-[1em]' />
      <ul className='flex flex-col gap-[1em]'>
        <li>
          The platform allows for up to 5 users to create an account. This limit
          is set because the free API enforces a minimum of 50 requests/month
          limit.
        </li>
        <li>
          The user will only need to create an account if they need to view the
          plane schedules.
        </li>
        <li>
          This limit is set by the project maintainer, if you wish to try the
          app, please reach out to them.
        </li>
      </ul>
    </main>
  );
};

export default usage;
