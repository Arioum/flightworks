import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LimitBanner from './components/LimitBanner';

import stylesheet from './tailwind.css';
import styles from './globals.css';
// Leaflet's stylesheet, for the aerial view map on the airport page.
import leafletStyles from 'leaflet/dist/leaflet.css';
import { RecoilRoot } from 'recoil';
import { RecoilEnv } from 'recoil';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: leafletStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* .ico for browsers without SVG favicon support (sizes keeps
            Chrome on the SVG), SVG for the rest, PNG for iOS home screens. */}
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <Meta />
        <Links />
      </head>
      <body className='min-h-screen flex flex-col bg-[#fff] text-[#202020]'>
        <Navbar />
        <div className='flex-1'>
          <RecoilRoot>
            <LimitBanner />
            <Outlet />
          </RecoilRoot>
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
