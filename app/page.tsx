import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { fetchBlogPosts } from '@/lib/fetch-blog-posts';

// Lazy load: reducen el JS inicial y cargan al hacer scroll o después
const Countdown = dynamic(() => import('@/components/Countdown'));
const WeatherValleFertil = dynamic(() => import('@/components/WeatherValleFertil'));
const ClasificacionMotos = dynamic(() => import('@/components/ClasificacionMotos'));
const AssociationHistory = dynamic(() => import('@/components/AssociationHistory'));
const News = dynamic(() => import('@/components/News'));
const Sponsors = dynamic(() => import('@/components/Sponsors'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const ModoVisita = dynamic(() => import('@/components/ModoVisita'));
const Footer = dynamic(() => import('@/components/Footer'));

export default async function Home() {
  const blogPosts = await fetchBlogPosts();

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Header />
      <Hero />
      <Countdown />
      <ModoVisita />
      <News items={blogPosts} />
      <WeatherValleFertil />
      {/* Circuitos en home solo móvil */}
      <section className="md:hidden bg-black py-10 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-lg">
          <Link
            href="/circuitos"
            className="flex items-center justify-between gap-4 rounded-xl border-2 border-[#65b330] bg-[#65b330]/10 px-5 py-4 text-white transition-all hover:bg-[#65b330]/20 hover:border-[#65b330]"
          >
            <span className="font-semibold uppercase tracking-wide">Circuitos</span>
            <svg className="w-5 h-5 shrink-0 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-400">Largadas y recorridos del Safari</p>
        </div>
      </section>
      <div className="hidden md:block">
        <ClasificacionMotos />
        <Gallery />
        <AssociationHistory />
      </div>
      <Sponsors />
      <FAQ />
      <Footer />
    </main>
  );
}
