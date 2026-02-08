import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';

// Lazy load componentes no críticos
const ClasificacionMotos = dynamic(() => import('@/components/ClasificacionMotos'));
const Features = dynamic(() => import('@/components/Features'));
const AssociationHistory = dynamic(() => import('@/components/AssociationHistory'));
const Sponsors = dynamic(() => import('@/components/Sponsors'));
const FAQ = dynamic(() => import('@/components/FAQ'));
// const Gallery = dynamic(() => import('@/components/Gallery'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Countdown />
      {/* Cronograma: enlace a página completa */}
      <section className="bg-black border-y border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/cronograma"
            className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#7dd340] font-semibold text-lg uppercase tracking-wide transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Cronograma
          </Link>
          <p className="text-gray-400 text-sm mt-1">Horarios del Safari – Motos 6, 7 y 8 de febrero</p>
        </div>
      </section>
      <ClasificacionMotos />
      <Features />
      <AssociationHistory />
      <Sponsors />
      <FAQ />
      {/* <Gallery /> */}
      <Footer />
    </main>
  );
}
