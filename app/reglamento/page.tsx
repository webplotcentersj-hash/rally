'use client';

import Link from 'next/link';
import Image from 'next/image';
import { reglamentoSections } from '@/lib/reglamento-data';
import { sponsors } from '@/lib/sponsors';

const LOGO_SAFARI = '/logo.png';
const LOGO_PLOT = 'http://plotcenter.com.ar/wp-content/uploads/2026/01/Logos-marcas-04-scaled.png';

export default function ReglamentoPage() {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:py-0 print:px-0 print:bg-white">
        <div className="max-w-4xl mx-auto reglamento-doc bg-white rounded-2xl shadow-xl overflow-hidden print:rounded-none print:shadow-none">
          {/* Cabecera con logos */}
          <header className="bg-black text-white p-6 md:p-8 print:p-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-6">
              <Image
                src={LOGO_SAFARI}
                alt="Safari Tras las Sierras"
                width={160}
                height={64}
                className="h-14 md:h-16 w-auto object-contain"
              />
              <img
                src={LOGO_PLOT}
                alt=""
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>
            <h1 className="text-center text-xl md:text-2xl font-bold uppercase tracking-tight">
              Reglamento particular de la prueba
            </h1>
            <p className="text-center text-[#65b330] font-semibold text-lg mt-2">
              Safari Tras las Sierras 2026
            </p>
          </header>

          {/* Contenido */}
          <main className="p-6 md:p-10 text-gray-800 print:text-black">
            {reglamentoSections.map((section) => (
              <section key={section.title} className="mb-8">
                <h2 className="text-[#65b330] font-bold uppercase tracking-wide text-sm border-b border-gray-200 pb-2 mb-3">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  {section.content}
                </p>
                {section.highlight && (
                  <p className="mt-4 text-sm md:text-base font-medium underline decoration-2 decoration-[#65b330] underline-offset-2 bg-amber-100 print:bg-amber-100 border-l-4 border-[#65b330] pl-3 py-2">
                    {section.highlight}
                  </p>
                )}
              </section>
            ))}
          </main>

          {/* Logos de sponsors - fondo oscuro para logos blancos */}
          <footer className="reglamento-sponsors border-t-2 border-[#65b330] bg-gray-900 text-white p-8 md:p-10 print:bg-gray-900">
            <div className="text-center mb-6">
              <span className="inline-block w-12 h-0.5 bg-[#65b330] mb-3" aria-hidden />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#65b330] mb-1">
                Organización y sponsors
              </h2>
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                Gracias por acompañarnos
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-4">
              {sponsors.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-center p-3 rounded-xl bg-white/5 min-w-[120px] md:min-w-[140px] h-16 md:h-20"
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="max-h-12 md:max-h-14 w-auto max-w-[120px] object-contain"
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-6 tracking-wide">
              Safari Tras las Sierras · Valle Fértil, San Juan · 2026
            </p>
          </footer>
        </div>

        {/* Acciones (ocultas al imprimir) */}
        <div className="no-print max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#65b330] text-white font-semibold hover:bg-[#5a9e2a] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Descargar reglamento (PDF)
          </button>
          <p className="text-sm text-gray-500">
            Al imprimir, elegí &quot;Guardar como PDF&quot; para descargar el archivo.
          </p>
          <Link
            href="/#faq"
            className="text-[#65b330] hover:underline text-sm font-medium"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
  );
}
