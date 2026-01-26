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
          </div>
        </div>
      </div>
    </section>
  );
}
