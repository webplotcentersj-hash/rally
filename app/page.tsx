import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';

// Lazy load componentes no críticos
const Features = dynamic(() => import('@/components/Features'));
const AssociationHistory = dynamic(() => import('@/components/AssociationHistory'));
const Sponsors = dynamic(() => import('@/components/Sponsors'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Countdown />
      <Features />
      <AssociationHistory />
      <Sponsors />
      <Footer />
    </main>
  );
}
