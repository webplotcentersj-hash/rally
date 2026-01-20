'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Error al reproducir video:', error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay con gradiente dinámico */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Logo con animación */}
          <div className="animate-fade-in-up mb-8">
            <img
              src="/logo.png"
              alt="Safari Tras las Sierras"
              className="mx-auto max-w-[250px] md:max-w-[350px] drop-shadow-2xl animate-pulse-slow"
            />
          </div>
          
          {/* Título principal con efecto de texto grande */}
          <div className="space-y-4 animate-fade-in-up-delay">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="block bg-gradient-to-r from-[#65b330] via-[#7dd87d] to-[#65b330] bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl">
                SAFARI
              </span>
              <span className="block text-white drop-shadow-2xl mt-2">
                TRAS LAS SIERRAS
              </span>
            </h1>
          </div>
          
          {/* Subtítulo con estilo */}
          <div className="animate-fade-in-up-delay-2">
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                🏁 Rally en Valle Fértil - San Juan 🏁
              </p>
            </div>
          </div>

          {/* Botones CTA mejorados */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16 animate-fade-in-up-delay-3">
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-[#65b330] hover:bg-[#5aa02a] text-white font-bold py-5 px-10 rounded-xl text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-[#65b330]/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚗 Inscribite Ahora
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
            
            <a
              href="#sobre"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-5 px-10 rounded-xl text-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50 shadow-xl hover:shadow-white/20"
            >
              <span className="flex items-center justify-center gap-2">
                📋 Más Información
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator mejorado */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm font-medium">Deslizá para ver más</span>
            <svg
              className="w-6 h-6 text-white/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#65b330] rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-[#65b330] rounded-full animate-float-delay opacity-40" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-30" />
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-[#65b330] rounded-full animate-float-delay-2 opacity-50" />
      </div>
    </section>
  );
}
