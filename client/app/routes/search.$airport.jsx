import { redirect } from '@remix-run/node';

// Old search result URLs (/search/ixe) now go straight to the airport page.
export const loader = ({ params }) =>
  redirect(`/schedule/${(params.airport ?? '').toUpperCase()}`);
