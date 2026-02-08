'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CAMPEONATO_TRAVESIA,
  CAMPEONATO_ENDURO,
  type CampeonatoClasificacion,
} from '@/lib/clasificacion-motos';

function BloqueCampeonato({ data }: { data: CampeonatoClasificacion }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-black/60 shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(101,179,48,0.12),transparent_50%)]" />
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">{data.titulo}</h3>
          <a
            href={data.pdfUrl}
            download={data.pdfNombreDescarga}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#65b330] text-white font-semibold text-sm hover:bg-[#5aa02a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar clasificación completa
          </a>
        </div>
        <p className="text-sm text-gray-400 mb-4">Primeros por categoría</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-gray-400 font-medium">
                <th className="py-2 pr-4">Categoría</th>
                <th className="py-2 pr-4">1º</th>
                <th className="py-2">Nº</th>
              </tr>
            </thead>
            <tbody>
              {data.primeros.map((row, i) => (
                <tr key={i} className="border-b border-white/5 text-white">
                  <td className="py-2.5 pr-4 font-medium">{row.categoria}</td>
                  <td className="py-2.5 pr-4">{row.primero}</td>
                  <td className="py-2.5">{row.numero ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="title-section font-bold text-white uppercase tracking-tight mb-2">
              Clasificación Motos
            </h2>
            <div className="w-24 h-0.5 bg-[#65b330] mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Campeonato Travesía y Campeonato Enduro – primeros por categoría. Descargá el PDF con la clasificación completa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <BloqueCampeonato data={CAMPEONATO_TRAVESIA} />
            <BloqueCampeonato data={CAMPEONATO_ENDURO} />
          </div>
        </div>
      </div>
    </section>
  );
}
