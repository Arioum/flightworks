import type { MetaFunction } from '@remix-run/node';
import HeroSection from '../layouts/HeroSection';

export const meta: MetaFunction = () => {
  return [
    { title: 'FlightWorks' },
    { name: 'description', content: 'Check airport status' },
  ];
};

export default function Index() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
