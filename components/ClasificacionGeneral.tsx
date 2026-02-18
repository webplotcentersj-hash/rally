'use client';

import { useState, useEffect, useRef } from 'react';

const PDF_URL = '/pdfs/clasificacion-general-2026.pdf';
const PDF_NOMBRE_DESCARGA = 'Clasificacion-General-Safari-Tras-las-Sierras-2026.pdf';

/** Primeros 10 de la clasificación general. */
const TOP_10 = [
  { puesto: 1, piloto: 'Emiliano Alaniz', esGanador: true },
  { puesto: 2, piloto: 'Leandro Rodriguez Corti - Aguero Martin', esGanador: false },
  { puesto: 3, piloto: 'Ignacio Villa - Gonzalo Diaz', esGanador: false },
  { puesto: 4, piloto: 'Leonardo Rodriguez', esGanador: false },
  { puesto: 5, piloto: 'Leonardo Rubiño', esGanador: false },
  { puesto: 6, piloto: 'Lino Sisterna Jr - Lucas Maggio', esGanador: false },
  { puesto: 7, piloto: 'Federico Pelleritti - José Daniel Paroli', esGanador: false },
  { puesto: 8, piloto: 'Pablo Rubiño - Carlos Benardini', esGanador: false },
  { puesto: 9, piloto: 'Carlos Daniel Turon - Sergio Santiago Brizuela', esGanador: false },
  { puesto: 10, piloto: 'Sebastián Perea - Delaporte Federico', esGanador: false },
];

export default function ClasificacionGeneral() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = 'hidden';
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setModalOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEscape);
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [modalOpen]);

  return (
    <>
      <section
        id="clasificacion-general"
        ref={sectionRef}
        className={`bg-black py-16 md:py-24 relative overflow-hidden section-transition ${isVisible ? 'animate' : ''}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#65b330]/15 border border-[#65b330]/30 text-[#65b330] text-xs font-semibold uppercase tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65b330] animate-pulse" />
                Resultados oficiales
              </div>
              <h2 className="title-section font-bold text-white uppercase tracking-tight mb-3">
                Clasificación general
              </h2>
              <div className="w-32 h-0.5 bg-[#65b330] mx-auto mb-6" />
              <p className="text-gray-400 text-lg">
                Ganador del Safari Tras las Sierras y primeros 10. La clasificación completa está en el PDF oficial.
              </p>
            </div>

            {/* Ganador destacado */}
            <div
              className={`rounded-2xl border-2 border-[#65b330]/60 bg-gradient-to-br from-[#65b330]/20 to-black/80 p-6 md:p-8 mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationFillMode: 'both' }}
            >
              <p className="text-[#65b330] text-xs font-bold uppercase tracking-widest mb-2">Ganador</p>
              <p className="text-white text-2xl md:text-3xl font-bold tracking-tight">Emiliano Alaniz</p>
            </div>

            {/* Top 10 */}
            <div
              className={`rounded-2xl border border-white/15 bg-white/[0.04] overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '100ms', animationFillMode: 'both' }}
            >
              <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Primeros 10</h3>
              </div>
              <ul className="divide-y divide-white/10">
                {TOP_10.map((row) => (
                  <li
                    key={row.puesto}
                    className={`flex items-center gap-4 px-4 py-3 ${row.esGanador ? 'bg-[#65b330]/10' : ''}`}
                  >
                    <span className="w-8 text-center text-gray-400 font-mono text-sm font-semibold">{row.puesto}º</span>
                    <span className={row.esGanador ? 'text-white font-bold' : 'text-gray-300'}>{row.piloto}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#65b330] px-6 py-3 text-white font-semibold text-sm shadow-lg shadow-[#65b330]/25 hover:bg-[#5aa02a] hover:scale-[1.02] transition-all duration-200"
              >
                Ver clasificación completa y descargar PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal: todos los puestos + descargar PDF */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                Clasificación general completa
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                Todos los puestos de la clasificación general están en el documento oficial. Podés verlo en una nueva pestaña o descargarlo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#65b330]/60 bg-[#65b330]/20 px-5 py-3 text-[#a3ff6f] font-semibold text-sm hover:bg-[#65b330]/30 transition-colors"
                >
                  Ver PDF en nueva pestaña
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={PDF_URL}
                  download={PDF_NOMBRE_DESCARGA}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65b330] px-5 py-3 text-white font-semibold text-sm shadow-lg hover:bg-[#5aa02a] transition-colors"
                >
                  Descargar PDF
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
