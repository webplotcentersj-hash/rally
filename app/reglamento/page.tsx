'use client';

import Link from 'next/link';
import Image from 'next/image';
import { reglamentoSections } from '@/lib/reglamento-data';
import { sponsors } from '@/lib/sponsors';

const LOGO_SAFARI = '/logo.png';
const LOGO_PLOT = 'http://plotcenter.com.ar/wp-content/uploads/2026/02/Recurso-15.png';

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
              </section>
            ))}
          </main>

          {/* Logos de sponsors */}
          <footer className="border-t border-gray-200 bg-gray-50 p-6 md:p-8 print:bg-gray-100">
            <p className="text-center text-xs uppercase tracking-wider text-gray-500 mb-4">
              Organización y sponsors
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {sponsors.map((s) => (
                <img
                  key={s.id}
                  src={s.logo}
                  alt={s.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
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
