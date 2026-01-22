import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';

// Lazy load componentes no críticos
const About = dynamic(() => import('@/components/About'), { ssr: true });
const Categories = dynamic(() => import('@/components/Categories'), { ssr: true });
const RegistrationInfo = dynamic(() => import('@/components/RegistrationInfo'), { ssr: true });
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false });
const Sponsors = dynamic(() => import('@/components/Sponsors'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Countdown />
      <About />
      <Categories />
      <RegistrationInfo />
      <Gallery />
      <Sponsors />
      <Contact />
      <Footer />
    </main>
  );
}
