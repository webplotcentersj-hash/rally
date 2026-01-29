'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import MapModal from './MapModal';
import LiveModal from './LiveModal';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  useEffect(() => {
    // Delay la reproducción del video para no bloquear el renderizado inicial
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.log('Error al reproducir video:', error);
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden pt-20">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'auto' }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido posicionado abajo */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white px-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-8 w-full">
          {/* Subtítulo elegante */}
          <div className="animate-fade-in-up">
            <p className="text-lg md:text-xl font-light tracking-widest uppercase text-white/90 mb-4">
              Safari en Valle Fértil - San Juan
            </p>
          </div>

          {/* Botones CTA elegantes */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-delay">
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white text-gray-900 font-semibold py-4 px-10 rounded-full text-lg transition-all duration-500 hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Inscribite Ahora
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <button
              onClick={() => setIsLiveModalOpen(true)}
              className="group bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-500 border border-red-500 hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" aria-hidden />
              Ver Safari en vivo
            </button>

            <button
              onClick={() => setIsMapModalOpen(true)}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-500 border border-white/30 hover:border-white/50"
            >
              <span className="flex items-center justify-center gap-3">
                Cómo llegar
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator minimalista */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </div>

      {/* Modales */}
      <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} />
      <LiveModal isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} />
    </section>
  );
}
