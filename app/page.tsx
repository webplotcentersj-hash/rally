import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';

// Lazy load componentes no críticos
const WeatherValleFertil = dynamic(() => import('@/components/WeatherValleFertil'));
const ClasificacionMotos = dynamic(() => import('@/components/ClasificacionMotos'));
const AssociationHistory = dynamic(() => import('@/components/AssociationHistory'));
const News = dynamic(() => import('@/components/News'));
const Sponsors = dynamic(() => import('@/components/Sponsors'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const ModoVisita = dynamic(() => import('@/components/ModoVisita'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Countdown />
      <ModoVisita />
      <News />
      <WeatherValleFertil />
      <ClasificacionMotos />
      <Gallery />
      <AssociationHistory />
      <Sponsors />
      <FAQ />
      <Footer />
    </main>
  );
}
