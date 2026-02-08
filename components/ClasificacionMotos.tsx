'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CAMPEONATO_TRAVESIA,
  CAMPEONATO_ENDURO,
  CLASIFICACION_DOMINGO,
  type CampeonatoClasificacion,
} from '@/lib/clasificacion-motos';

function BloqueCampeonato({ data }: { data: CampeonatoClasificacion }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.07] via-black/50 to-black/80 shadow-xl shadow-black/30 transition-all duration-300 hover:border-[#65b330]/40 hover:shadow-[0_0_30px_rgba(101,179,48,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(101,179,48,0.15),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#65b330]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#65b330]/20 border border-[#65b330]/40">
              <svg className="h-5 w-5 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{data.titulo}</h3>
          </div>
          <a
            href={data.pdfUrl}
            download={data.pdfNombreDescarga}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#65b330] text-white font-semibold text-sm shadow-lg shadow-[#65b330]/25 hover:bg-[#5aa02a] hover:scale-[1.02] hover:shadow-[#65b330]/35 transition-all duration-200"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar clasificación completa
          </a>
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-[#65b330]/90 mb-4">Primeros por categoría</p>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/15 bg-white/5">
                <th className="py-3 px-4 text-left text-gray-400 font-semibold uppercase tracking-wider text-xs">Categoría</th>
                <th className="py-3 px-4 text-left text-gray-400 font-semibold uppercase tracking-wider text-xs">1º</th>
                <th className="py-3 px-4 text-left text-gray-400 font-semibold uppercase tracking-wider text-xs">Nº</th>
              </tr>
            </thead>
            <tbody>
              {data.primeros.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/5 text-white transition-colors duration-150 hover:bg-white/[0.04] ${i === 0 ? 'bg-[#65b330]/5' : ''}`}
                >
                  <td className="py-2.5 px-4 font-medium">{row.categoria}</td>
                  <td className="py-2.5 px-4">{row.primero}</td>
                  <td className="py-2.5 px-4 font-mono text-[#65b330]/90">{row.numero ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Para la clasificación completa descargá el PDF.
        </p>
      </div>
    </article>
  );
}

export default function ClasificacionMotos() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="clasificacion-motos"
      ref={sectionRef}
      className={`bg-black py-16 md:py-24 relative overflow-hidden section-transition ${isVisible ? 'animate' : ''}`}
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#65b330]/15 border border-[#65b330]/30 text-[#65b330] text-xs font-semibold uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65b330] animate-pulse" />
              Resultados oficiales
            </div>
            <h2 className="title-section font-bold text-white uppercase tracking-tight mb-3">
              Clasificación Motos
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#65b330]" />
              <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
              <span className="h-px flex-1 max-w-24 bg-[#65b330]" />
              <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#65b330]" />
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Clasificación Sábado (Travesía y Enduro) y Domingo – primeros por categoría. Descargá el PDF con la clasificación completa.
            </p>
          </div>

          {/* Clasificación Sábado */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40">
                <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">Clasificación Sábado</h3>
              <span className="h-px flex-1 max-w-32 bg-gradient-to-r from-amber-500/40 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <BloqueCampeonato data={CAMPEONATO_TRAVESIA} />
              <BloqueCampeonato data={CAMPEONATO_ENDURO} />
            </div>
          </div>

          {/* Clasificación Domingo */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40">
                <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">Clasificación Domingo</h3>
              <span className="h-px flex-1 max-w-32 bg-gradient-to-r from-emerald-500/40 to-transparent" />
            </div>
            <div className="max-w-2xl">
              <BloqueCampeonato data={CLASIFICACION_DOMINGO} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
