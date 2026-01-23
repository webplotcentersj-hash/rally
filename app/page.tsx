import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';

// Lazy load componentes no críticos
const About = dynamic(() => import('@/components/About'));
const Categories = dynamic(() => import('@/components/Categories'));
const RegistrationInfo = dynamic(() => import('@/components/RegistrationInfo'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Sponsors = dynamic(() => import('@/components/Sponsors'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Countdown />
      <div 
        className="relative"
        style={{
          backgroundImage: 'url(https://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-1-3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <About />
        <Categories />
        <RegistrationInfo />
        <Gallery />
        <Sponsors />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
