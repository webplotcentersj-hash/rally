'use client';

import { useEffect, useRef, useState } from 'react';
import CategoriesModal from './CategoriesModal';

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const [selectedCategoryType, setSelectedCategoryType] = useState<'autos' | 'motos' | 'cuatris' | null>(null);
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
      id="sobre"
      ref={sectionRef}
      className={`bg-black py-16 md:py-24 relative overflow-hidden section-transition ${
        isVisible ? 'animate' : ''
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
          <div className={`text-center mb-8 scroll-animate ${isVisible ? 'animate' : ''}`}>
            <h2 className="title-section font-bold text-white uppercase tracking-tight mb-4">
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
            <div 
              className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 border-2 border-transparent shadow-xl transition-all duration-500 cursor-pointer scroll-animate-left ${
                isVisible ? 'animate' : ''
              } ${
                hoveredCard === 0 ? 'scale-105 border-[#65b330] shadow-2xl shadow-[#65b330]/50' : ''
              }`}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex-shrink-0 transition-transform duration-500 ${hoveredCard === 0 ? 'rotate-12 scale-110' : ''}`}>
                  <svg className="w-12 h-12 text-[#65b330]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                    {hoveredCard === 0 ? <span className="text-[#65b330]">Paisajes Espectaculares</span> : 'Paisajes Espectaculares'}
                  </h3>
                  <p className={`text-gray-700 leading-relaxed transition-all duration-500 ${expandedCard === 0 ? 'text-base' : ''}`}>
                    Recorré terrenos desafiantes y paisajes únicos que solo Valle Fértil puede ofrecer.
                    {expandedCard === 0 && (
                      <span className="block mt-2 text-sm text-gray-600">
                        Desde montañas escarpadas hasta valles verdes, cada ruta es una nueva aventura visual.
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {hoveredCard === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex items-center gap-2 text-sm text-[#65b330] font-semibold">
                    <span>✨ Experiencia única</span>
                  </div>
                </div>
              )}
            </div>

            {/* Caja Adrenalina Pura */}
            <div 
              className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 border-2 border-transparent shadow-xl transition-all duration-500 cursor-pointer scroll-animate-right ${
                isVisible ? 'animate' : ''
              } ${
                hoveredCard === 1 ? 'scale-105 border-[#65b330] shadow-2xl shadow-[#65b330]/50' : ''
              }`}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex-shrink-0 transition-transform duration-500 ${hoveredCard === 1 ? 'rotate-12 scale-110' : ''}`}>
                  <svg className="w-12 h-12 text-[#65b330]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                    {hoveredCard === 1 ? <span className="text-[#65b330]">Adrenalina Pura</span> : 'Adrenalina Pura'}
                  </h3>
                  <p className={`text-gray-700 leading-relaxed transition-all duration-500 ${expandedCard === 1 ? 'text-base' : ''}`}>
                    Experimentá la emoción de competir en una aventura que combina pasión, naturaleza y competencia.
                    {expandedCard === 1 && (
                      <span className="block mt-2 text-sm text-gray-600">
                        Cada curva, cada obstáculo, cada momento es una oportunidad para superar tus límites.
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {hoveredCard === 1 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex items-center gap-2 text-sm text-[#65b330] font-semibold">
                    <span>⚡ Máxima emoción</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Banner "¿Qué te espera?" */}
          <div 
            className={`bg-gradient-to-r from-[#65b330] to-[#4a8a26] rounded-xl p-6 md:p-8 mb-8 text-center shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl scroll-animate-scale ${
              isVisible ? 'animate' : ''
            } relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10 transform transition-transform duration-300 hover:scale-110">
              ¿Qué te espera?
            </h3>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0 hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          {/* Lista de expectativas */}
          <div className="space-y-4 mb-12">
            {[
              { text: 'Rutas desafiantes y emocionantes', icon: '🏁' },
              { text: 'Competencia de primer nivel', icon: '🏆' },
              { text: 'Ambiente familiar y deportivo', icon: '👨‍👩‍👧‍👦' },
              { text: 'Premios y reconocimientos', icon: '🎖️' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`group flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#65b330] hover:scale-105 transition-all duration-300 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0) scale(1)';
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#65b330] to-[#4a8a26] rounded-full flex items-center justify-center text-2xl transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                  {item.icon}
                </div>
                <p className="text-lg md:text-xl text-white font-medium flex-1 group-hover:text-[#65b330] transition-colors duration-300">
                  {item.text}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Tarjetas de información */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tarjeta Categorías */}
            <div 
              className={`bg-white rounded-xl border-4 border-black shadow-xl overflow-hidden transition-all duration-500 cursor-pointer scroll-animate ${
                isVisible ? 'animate' : ''
              } ${
                hoveredCard === 2 ? 'scale-110 rotate-2 shadow-2xl border-[#65b330]' : 'hover:scale-105 hover:rotate-1'
              }`}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Ícono de categorías */}
              <div className="flex justify-center pt-6 pb-2">
                <svg className="w-12 h-12 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              
              {/* Título Categorías */}
              <div className="bg-[#65b330] mx-4 rounded-lg px-4 py-2 mb-4 text-center">
                <h3 className="text-xl font-bold text-white">Categorías</h3>
              </div>
              
              {/* Secciones Autos, Motos y Cuatris */}
              <div className="px-4 pb-4 space-y-3">
                <div 
                  onClick={() => {
                    setSelectedCategoryType('autos');
                    setCategoriesModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 text-center border-2 border-gray-300 hover:border-[#65b330] transition-colors duration-300 cursor-pointer hover:shadow-md"
                >
                  <p className="text-xl font-bold text-black">🚗 Autos</p>
                </div>
                <div 
                  onClick={() => {
                    setSelectedCategoryType('motos');
                    setCategoriesModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 text-center border-2 border-gray-300 hover:border-[#65b330] transition-colors duration-300 cursor-pointer hover:shadow-md"
                >
                  <p className="text-xl font-bold text-black">🏍️ Motos</p>
                </div>
                <div 
                  onClick={() => {
                    setSelectedCategoryType('cuatris');
                    setCategoriesModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 text-center border-2 border-gray-300 hover:border-[#65b330] transition-colors duration-300 cursor-pointer hover:shadow-md"
                >
                  <p className="text-xl font-bold text-black">🏎️ Cuatris</p>
                </div>
              </div>
            </div>

            {/* Tarjeta Ubicación */}
            <div 
              className={`bg-white rounded-xl border-4 border-black shadow-xl overflow-hidden transition-all duration-500 cursor-pointer scroll-animate ${
                isVisible ? 'animate' : ''
              } ${
                hoveredCard === 3 ? 'scale-110 rotate-2 shadow-2xl border-[#65b330]' : 'hover:scale-105 hover:rotate-1'
              }`}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
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
            <div 
              className={`bg-white rounded-xl border-4 border-black shadow-xl overflow-hidden transition-all duration-500 cursor-pointer scroll-animate ${
                isVisible ? 'animate' : ''
              } ${
                hoveredCard === 4 ? 'scale-110 rotate-2 shadow-2xl border-[#65b330]' : 'hover:scale-105 hover:rotate-1'
              }`}
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
            >
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

      {/* Modal de categorías */}
      <CategoriesModal
        isOpen={categoriesModalOpen}
        onClose={() => {
          setCategoriesModalOpen(false);
          setSelectedCategoryType(null);
        }}
        type={selectedCategoryType}
      />
    </section>
  );
}

