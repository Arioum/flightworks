import { useLoaderData } from '@remix-run/react';
import SearchAirport from '../layouts/SearchAirport';

export const loader = async ({ req, params }) => {
  const apiKey = process.env.RAPID_API_KEY_AIRPORT;
  return apiKey;
};

const Search = () => {
  const apiKey = useLoaderData();

  return (
    <main className='content-wrapper py-[2em] md:px-[1em]'>
      <SearchAirport apiKey={apiKey} />
    </main>
  );
};

export default Search;
