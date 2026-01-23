'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const carouselImages = [
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-01.jpg-scaled.jpeg',
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-08.jpg-scaled.jpeg',
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-06.jpg-scaled.jpeg',
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-07.jpg-scaled.jpeg'
];

export default function AssociationHistory() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full bg-black py-12 md:py-16 overflow-hidden section-transition ${
        isVisible ? 'animate' : ''
      }`}
    >
      <div className="container mx-auto px-4 space-y-8">
        {/* Carrusel de fotos */}
        <div className={`relative w-full max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image 
                  src={img}
                  alt={`Imagen ${index + 1} del Safari`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  unoptimized
                />
              </div>
            ))}
            
            {/* Botones de navegación */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10 hover:scale-110"
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10 hover:scale-110"
              aria-label="Siguiente imagen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Imagen de asociación */}
        <div className={`flex justify-center items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative w-full max-w-7xl">
            <Image
              src="http://plotcenter.com.ar/wp-content/uploads/2026/01/asociacion-con-historia_1.png"
              alt="Una Asociación con Historia"
              width={1200}
              height={600}
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              unoptimized
              priority
            />
            {/* Efecto de brillo sutil al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
