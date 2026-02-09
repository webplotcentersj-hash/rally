'use client';

import Link from 'next/link';
import Header from '@/components/Header';

const CIRCUITOS_AUTOS = [
  {
    id: 'prime1',
    title: 'Largada Sábado Prime 1',
    url: 'https://maps.app.goo.gl/QhbFRccxzomw48FM9',
  },
  {
    id: 'prime2',
    title: 'Largada Sábado Prime 2',
    url: 'https://maps.google.com/maps?q=-30.6350633%2C-67.4194867&z=17&hl=es',
  },
  {
    id: 'domingo',
    title: 'Largada Prime único – Domingo',
    subtitle: 'Balde de las Chilcas - San Agustín',
    url: 'https://maps.google.com/maps?q=-30.6433933%2C-67.4040283&z=17&hl=es',
  },
];

const IconMap = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconExternal = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function CircuitosPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#030803] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(101,179,48,0.18),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.06)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

      <Header />

      <div className="relative pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in-up">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#8ee04a] transition-all mb-8 text-sm font-medium uppercase tracking-widest"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[#65b330]/30 to-[#65b330]/5 border border-[#65b330]/50 mb-6 shadow-[0_0_60px_rgba(101,179,48,0.25)]">
                <svg className="w-12 h-12 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 title-section tracking-tight drop-shadow-lg">
                Circuitos de autos
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-base">
                Ubicaciones de largada para cada prime. Abrí el enlace para ver el punto en Google Maps.
              </p>
            </div>

            {/* Lista de circuitos */}
            <div className="space-y-5">
              {CIRCUITOS_AUTOS.map((circuito) => (
                <a
                  key={circuito.id}
                  href={circuito.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#65b330]/30 bg-black/60 p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-[#65b330]/60 hover:shadow-[0_0_30px_rgba(101,179,48,0.15)] hover:bg-[#65b330]/5"
                >
                  <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#65b330]/20 border border-[#65b330]/40 text-[#65b330] group-hover:bg-[#65b330]/30 group-hover:border-[#65b330]/60 transition-colors">
                    <IconMap />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-lg group-hover:text-[#a3ff6f] transition-colors">
                      {circuito.title}
                    </p>
                    {circuito.subtitle && (
                      <p className="text-gray-400 text-sm mt-0.5">{circuito.subtitle}</p>
                    )}
                  </div>
                  <span className="flex items-center gap-2 text-[#65b330] text-sm font-medium shrink-0 group-hover:gap-3 transition-all">
                    Ver mapa
                    <IconExternal />
                  </span>
                </a>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-10">
              Safari Tras las Sierras – Circuitos de autos · Valle Fértil
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
