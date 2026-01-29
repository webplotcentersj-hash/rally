'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { fetchTiempos, type TiempoItem } from '@/lib/tiempos-api';
import { sponsors } from '@/lib/sponsors';

export default function TiemposPage() {
  const [tiempos, setTiempos] = useState<TiempoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchTiempos();
        if (!cancelled) {
          setTiempos(data);
          setError(data.length === 0 ? 'Aún no hay tiempos publicados.' : null);
        }
      } catch (e) {
        if (!cancelled) {
          setError('No se pudieron cargar los tiempos. Revisá más tarde.');
          setTiempos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#5aa02a] transition-colors mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 title-section">
                Tiempos
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tiempos oficiales del Safari Tras las Sierras. Los datos se actualizan desde la app Safari.
              </p>
              <div className="w-32 h-0.5 bg-[#65b330] mx-auto mt-4" />
            </div>

            {/* Tabla de tiempos */}
            <section className="mb-16">
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
                {loading ? (
                  <div className="py-20 text-center">
                    <div className="inline-block w-10 h-10 border-2 border-[#65b330] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-400">Cargando tiempos...</p>
                  </div>
                ) : error && tiempos.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-gray-400 text-lg mb-2">{error}</p>
                    <p className="text-gray-500 text-sm">
                      Cuando la app Safari publique resultados, aparecerán aquí.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700 bg-gray-800/80">
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm">Pos.</th>
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm">Piloto</th>
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm hidden md:table-cell">Copiloto</th>
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm">Categoría</th>
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm">Nº</th>
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm">Tiempo</th>
                          <th className="py-4 px-4 text-[#65b330] font-semibold uppercase text-sm">Dif.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tiempos.map((t, i) => (
                          <tr
                            key={t.id ?? i}
                            className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors"
                          >
                            <td className="py-3 px-4 text-white font-medium">{t.posicion}</td>
                            <td className="py-3 px-4 text-white">{t.piloto}</td>
                            <td className="py-3 px-4 text-gray-400 hidden md:table-cell">{t.copiloto ?? '—'}</td>
                            <td className="py-3 px-4 text-gray-300">{t.categoria}</td>
                            <td className="py-3 px-4 text-gray-300">{t.numero ?? '—'}</td>
                            <td className="py-3 px-4 text-[#65b330] font-mono">{t.tiempo_total ?? '—'}</td>
                            <td className="py-3 px-4 text-gray-400">{t.diferencia ?? '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Sponsors */}
            <section className="py-12 border-t border-gray-800">
              <div className="text-center mb-10">
                <h2 className="title-section text-white mb-4">Patrocinadores</h2>
                <div className="w-20 h-px bg-[#65b330] mx-auto" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="flex items-center justify-center w-32 h-20 md:w-40 md:h-24 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={160}
                      height={96}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
