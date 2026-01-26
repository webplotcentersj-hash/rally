'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Sponsors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sponsors = [
    {
      id: 1,
      name: 'Sponsor 1',
      logo: 'http://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-166-1.png',
    },
    {
      id: 2,
      name: 'Plot Center',
      logo: 'http://plotcenter.com.ar/wp-content/uploads/2026/01/LOGO-PLOT-VERSIONES_Mesa-de-trabajo-1-copia.png',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, [sponsors.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
  };

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section text-white mb-4">
            Patrocinadores
          </h2>
          <div className="w-20 h-px bg-[#65b330] mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carrusel */}
          <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={500}
                  height={250}
                  className="max-w-[400px] md:max-w-[500px] max-h-[200px] md:max-h-[250px] w-auto h-auto object-contain"
                  unoptimized
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Botones de navegación */}
            {sponsors.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
                  aria-label="Sponsor anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
                  aria-label="Siguiente sponsor"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {sponsors.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Ir a sponsor ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
