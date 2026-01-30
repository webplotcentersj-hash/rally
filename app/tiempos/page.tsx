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

  const getPodiumClass = (pos: number) => {
    if (pos === 1) return 'bg-gradient-to-r from-amber-500/20 to-yellow-600/10 border-l-4 border-amber-400';
    if (pos === 2) return 'bg-gradient-to-r from-slate-400/20 to-slate-500/10 border-l-4 border-slate-300';
    if (pos === 3) return 'bg-gradient-to-r from-amber-700/20 to-amber-800/10 border-l-4 border-amber-600';
    return '';
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {/* Fondo con gradiente y textura sutil */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0f0a] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(101,179,48,0.12),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <Header />
      <div className="relative pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in-up">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#7dd340] transition-all mb-8 text-sm font-medium uppercase tracking-widest"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#65b330]/20 border border-[#65b330]/40 mb-6 shadow-[0_0_40px_rgba(101,179,48,0.15)]">
                <svg className="w-10 h-10 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 title-section tracking-tight drop-shadow-lg">
                Tiempos
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-lg mb-6">
                Resultados oficiales del Safari Tras las Sierras. Actualizados en vivo desde la app.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-24 bg-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#65b330]" />
              </div>
            </div>

            {/* Tabla de tiempos */}
            <section className="mb-20">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-2xl shadow-black/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(101,179,48,0.08),transparent_70%)]" />
                {loading ? (
                  <div className="relative py-24 text-center">
                    <div className="inline-flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-[#65b330]/30" />
                        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-[#65b330] animate-spin" />
                        <div className="absolute inset-2 w-12 h-12 rounded-full border-2 border-transparent border-t-[#65b330]/60 animate-spin [animation-duration:1.5s]" />
                      </div>
                      <p className="text-gray-400 font-medium">Cargando tiempos...</p>
                      <p className="text-gray-500 text-sm">Conectando con la app Safari</p>
                    </div>
                  </div>
                ) : error && tiempos.length === 0 ? (
                  <div className="relative py-20 text-center px-6">
                    <div className="inline-flex flex-col items-center gap-4 max-w-md">
                      <div className="w-24 h-24 rounded-full bg-[#65b330]/10 flex items-center justify-center border border-[#65b330]/20">
                        <svg className="w-12 h-12 text-[#65b330]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-white text-xl font-semibold">{error}</p>
                      <p className="text-gray-500 text-sm">
                        Cuando la app Safari publique resultados, aparecerán aquí automáticamente.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest">Pos.</th>
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest">Piloto</th>
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest hidden md:table-cell">Copiloto</th>
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest">Categoría</th>
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest">Nº</th>
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest">Tiempo</th>
                          <th className="py-5 px-5 text-[#65b330] font-bold uppercase text-xs tracking-widest">Dif.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tiempos.map((t, i) => (
                          <tr
                            key={t.id ?? i}
                            className={`border-b border-white/5 transition-all duration-200 hover:bg-white/[0.06] ${getPodiumClass(t.posicion)}`}
                          >
                            <td className="py-4 px-5">
                              <span className={`inline-flex items-center justify-center min-w-[2rem] h-8 rounded-lg font-bold text-sm ${
                                t.posicion === 1 ? 'bg-amber-500/20 text-amber-400' :
                                t.posicion === 2 ? 'bg-slate-400/20 text-slate-300' :
                                t.posicion === 3 ? 'bg-amber-700/20 text-amber-500' :
                                'bg-white/10 text-gray-300'
                              }`}>
                                {t.posicion}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-white font-semibold">{t.piloto}</td>
                            <td className="py-4 px-5 text-gray-400 hidden md:table-cell">{t.copiloto ?? '—'}</td>
                            <td className="py-4 px-5">
                              <span className="px-2.5 py-1 rounded-md bg-[#65b330]/15 text-[#65b330] text-sm font-medium">
                                {t.categoria}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-gray-300 font-mono">{t.numero ?? '—'}</td>
                            <td className="py-4 px-5 text-[#65b330] font-mono font-semibold tabular-nums">{t.tiempo_total ?? '—'}</td>
                            <td className="py-4 px-5 text-gray-400 font-mono text-sm">{t.diferencia ?? '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Sponsors */}
            <section className="relative">
              <div className="text-center mb-12">
                <p className="text-[#65b330] text-sm font-semibold uppercase tracking-[0.2em] mb-2">Con el apoyo de</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 title-section">Patrocinadores</h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto" />
              </div>
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 md:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(101,179,48,0.06),transparent)]" />
                <div className="relative grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 items-center justify-items-center">
                  {sponsors.map((sponsor, i) => (
                    <div
                      key={sponsor.id}
                      className="group flex items-center justify-center w-full max-w-[180px] h-16 md:h-20 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#65b330]/30 hover:bg-[#65b330]/5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(101,179,48,0.1)]"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={160}
                        height={80}
                        className="max-w-full max-h-full w-auto h-auto object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
