import { redirect } from '@remix-run/node';

// Search now lives in the navbar; the old /search page goes home.
export const loader = () => redirect('/');
