import { redirect } from '@remix-run/node';

// Usage limits now live on the combined "Data & usage" page.
export const loader = () => redirect('/data');
