'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import {
  CATEGORIAS_AUTO,
  CATEGORIAS_ENDURO,
  CATEGORIAS_MOTO_TRAVESIAS,
  CATEGORIAS_CUATRI,
} from '@/lib/categorias-inscripcion';

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Categorías de Competencia
            </h1>
            <div className="w-32 h-0.5 bg-[#65b330] mx-auto" />
          </div>

          {/* Sección Autos */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#65b330] to-[#4a8a26] rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-white">
                Categorías de Autos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIAS_AUTO.map((categoria, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 hover:border-[#65b330] transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#65b330] rounded-full p-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{categoria}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sección Motos */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#65b330] to-[#4a8a26] rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-white">
                Categorías de Motos
              </h2>
            </div>
            {/* Enduro */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Campeonato Sanjuanino de Enduro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIAS_ENDURO.map((categoria, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 hover:border-[#65b330] transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#65b330] rounded-full p-2 flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{categoria}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Motos Travesías / Safari */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Motos (Travesías / Safari)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIAS_MOTO_TRAVESIAS.map((categoria, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 hover:border-[#65b330] transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#65b330] rounded-full p-2 flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{categoria}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sección Cuatris */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#65b330] to-[#4a8a26] rounded-xl p-6 mb-6">
              <h2 className="text-3xl font-bold text-white">
                Categorías de Cuatriciclos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIAS_CUATRI.map((categoria, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 hover:border-[#65b330] transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#65b330] rounded-full p-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{categoria}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer de la página */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-4">
              Para más información sobre las categorías y realizar tu inscripción
            </p>
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#65b330] text-white font-semibold rounded-lg hover:bg-[#5aa02a] transition-colors"
            >
              Inscribite aquí
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
