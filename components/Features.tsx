'use client';

import { useEffect, useRef, useState } from 'react';

export default function Features() {
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
      className={`bg-black py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Elementos decorativos de huellas en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-20 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,40 Q150,20 300,35 T600,30 T900,40 T1200,35 L1200,80 L0,80 Z" fill="#65b330" opacity="0.3" />
          <path d="M0,45 Q200,25 400,40 T800,35 T1200,40 L1200,80 L0,80 Z" fill="#333" opacity="0.4" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Título principal */}
          <div className={`text-center mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-4">
              SAFARI TRAS LAS SIERRAS
            </h2>
            <div className="w-32 h-0.5 bg-white mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-white">
              Una competencia única de safari en el corazón de{' '}
              <span className="text-[#65b330] font-semibold">Valle Fértil, San Juan.</span>
            </p>
          </div>

          {/* Dos cajas de características */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Caja Paisajes Espectaculares */}
            <div className={`bg-gray-100 rounded-xl p-8 border border-white/20 shadow-lg hover-lift hover-glow transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Paisajes Espectaculares</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Recorré terrenos desafiantes y paisajes únicos que solo Valle Fértil puede ofrecer.
                  </p>
                </div>
              </div>
            </div>

            {/* Caja Adrenalina Pura */}
            <div className={`bg-gray-100 rounded-xl p-8 border border-white/20 shadow-lg hover-lift hover-glow transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Adrenalina Pura</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Experimentá la emoción de competir en una aventura que combina pasión, naturaleza y competencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner "¿Qué te espera?" */}
          <div className={`bg-[#65b330] rounded-xl p-6 md:p-8 mb-8 text-center shadow-xl hover-scale transition-all duration-500 delay-400 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <h3 className="text-2xl md:text-3xl font-bold text-white">¿Qué te espera?</h3>
          </div>

          {/* Lista de expectativas */}
          <div className="space-y-4 mb-12">
            {[
              'Rutas desafiantes y emocionantes',
              'Competencia de primer nivel',
              'Ambiente familiar y deportivo',
              'Premios y reconocimientos'
            ].map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 pb-4 border-b border-white/10 last:border-0 hover-lift transition-all duration-300 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-[#65b330] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl text-white">{item}</p>
              </div>
            ))}
          </div>

          {/* Tarjetas de información */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tarjeta Categorías */}
            <div className={`bg-white rounded-xl border-4 border-black shadow-xl overflow-hidden hover-lift hover-rotate transition-all duration-500 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Patrón de bandera a cuadros */}
              <div className="h-16 bg-[#65b330] relative overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.1) 25%),
                    linear-gradient(-45deg, transparent 25%, rgba(0,0,0,0.1) 25%),
                    linear-gradient(45deg, rgba(0,0,0,0.1) 75%, transparent 75%),
                    linear-gradient(-45deg, rgba(0,0,0,0.1) 75%, transparent 75%)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }} />
              </div>
              
              {/* Botón Categorías */}
              <div className="bg-[#65b330] mx-4 -mt-8 rounded-lg px-4 py-2 mb-4 text-center">
                <h3 className="text-xl font-bold text-white">Categorías</h3>
              </div>
              
              {/* Secciones Autos y Motos */}
              <div className="px-4 pb-4 space-y-3">
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-black">Autos</p>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-black">Motos</p>
                </div>
              </div>
            </div>

            {/* Tarjeta Ubicación */}
            <div className={`bg-white rounded-xl border-4 border-black shadow-xl overflow-hidden hover-lift hover-rotate transition-all duration-500 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Ícono de pin */}
              <div className="flex justify-center pt-6 pb-2">
                <svg className="w-12 h-12 text-[#65b330]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              
              {/* Botón Ubicación */}
              <div className="bg-[#65b330] mx-4 rounded-lg px-4 py-2 mb-4 text-center">
                <h3 className="text-xl font-bold text-white">Ubicación</h3>
              </div>
              
              {/* Texto de ubicación */}
              <div className="bg-gray-200 rounded-lg mx-4 mb-4 p-4 text-center">
                <p className="text-2xl font-bold text-black mb-1">Valle Fértil</p>
                <p className="text-base text-black">San Juan, Arg.</p>
              </div>
            </div>

            {/* Tarjeta Fecha */}
            <div className={`bg-white rounded-xl border-4 border-black shadow-xl overflow-hidden hover-lift hover-rotate transition-all duration-500 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Ícono de calendario */}
              <div className="flex justify-center pt-6 pb-2">
                <svg className="w-12 h-12 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  <circle cx="18" cy="18" r="2" fill="currentColor" />
                </svg>
              </div>
              
              {/* Botón Fecha */}
              <div className="bg-[#65b330] mx-4 rounded-lg px-4 py-2 mb-4 text-center">
                <h3 className="text-xl font-bold text-white">Fecha</h3>
              </div>
              
              {/* Secciones de fechas */}
              <div className="px-4 pb-4 space-y-3">
                <div className="bg-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-black mb-2">Motos</p>
                  <p className="text-xl font-bold text-black">6, 7 y 8 de Febrero</p>
                </div>
                <div className="bg-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-black mb-2">Autos</p>
                  <p className="text-xl font-bold text-black">13, 14 y 15 de Febrero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de huellas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,40 Q150,20 300,35 T600,30 T900,40 T1200,35 L1200,80 L0,80 Z" fill="#65b330" opacity="0.3" />
          <path d="M0,45 Q200,25 400,40 T800,35 T1200,40 L1200,80 L0,80 Z" fill="#333" opacity="0.4" />
        </svg>
      </div>
    </section>
  );
}

