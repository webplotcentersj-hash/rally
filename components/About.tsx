'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const images = [
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-01.jpg-scaled.jpeg',
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-08.jpg-scaled.jpeg',
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-06.jpg-scaled.jpeg',
  'http://plotcenter.com.ar/wp-content/uploads/2026/01/insumos-para-figma-07.jpg-scaled.jpeg'
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section 
      ref={sectionRef}
      id="sobre" 
      className={`relative overflow-visible section-transition ${
        isVisible ? 'animate' : ''
      }`}
      style={{
        backgroundImage: 'url(https://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-1-3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        paddingTop: '20px'
      }}
    >

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header verde con título */}
        <div className={`bg-[#65b330] py-6 md:py-8 mb-6 relative hover-scale scroll-animate ${isVisible ? 'animate' : ''}`}>
          <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1200 40" preserveAspectRatio="none">
              <path d="M0,20 Q200,5 400,15 T800,10 T1200,20 L1200,40 L0,40 Z" fill="#4a8a26" opacity="0.6" />
            </svg>
          </div>
          <h2 className="title-section font-bold text-white text-center uppercase tracking-wide">
            UNA ASOCIACIÓN CON HISTORIA
          </h2>
        </div>

        {/* Grid: Galería izquierda y texto derecho */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
          {/* Carrusel de galería a la izquierda */}
          <div className={`relative scroll-animate-left ${isVisible ? 'animate' : ''}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl hover-scale transition-transform duration-300">
              {images.map((img, index) => (
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            
            {/* Botones de navegación */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10 hover-scale hover-glow"
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10 hover-scale hover-glow"
              aria-label="Siguiente imagen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-[#65b330]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Texto a la derecha con fondo verde */}
          <div className={`bg-[#65b330] p-6 md:p-8 rounded-lg shadow-xl hover-lift hover-glow scroll-animate-right ${isVisible ? 'animate' : ''}`}>
            <div className="text-white space-y-4 text-justify">
              <p className="text-lg md:text-xl leading-relaxed">
                El <span className="bg-yellow-400 text-gray-900 font-bold px-2 py-1 rounded shadow-lg border-2 border-yellow-500">Safari tras las Sierras</span> nació en 1990 como un desafío entre amigos, 
                una aventura que con el tiempo se transformó en un clásico del automovilismo sanjuanino.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Lo que comenzó como una simple competencia entre conocidos, hoy es un verdadero festival 
                que cada febrero convierte a Valle Fértil en el epicentro de la pasión por el off-road.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Después de más de treinta años, el <span className="bg-yellow-400 text-gray-900 font-bold px-2 py-1 rounded shadow-lg border-2 border-yellow-500">Safari tras las Sierras</span> mantiene 
                intacto su espíritu original: aventura, camaradería y amor por la tierra. Es un orgullo 
                para todos los miembros de <span className="bg-yellow-400 text-gray-900 font-bold px-2 py-1 rounded shadow-lg border-2 border-yellow-500">ADIVA</span> y una tradición que sigue 
                creciendo año a año.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
