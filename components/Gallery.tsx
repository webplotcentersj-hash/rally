'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/lib/gallery-data';

const PREVIEW_COUNT = 8;

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [verMas, setVerMas] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const showInGrid = verMas ? galleryImages : galleryImages.slice(0, PREVIEW_COUNT);
  const hasMore = galleryImages.length > PREVIEW_COUNT;

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className={`relative bg-black py-16 md:py-24 overflow-hidden section-transition ${isVisible ? 'animate' : ''}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 scroll-animate ${isVisible ? 'animate' : ''}`}>
              <h2 className="title-section font-bold text-white uppercase tracking-tight mb-4">
                Galería
              </h2>
              <div className="w-32 h-0.5 bg-[#65b330] mx-auto mb-6" />
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Fotos del Safari Tras las Sierras. Tocá una foto para agrandarla.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {showInGrid.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#65b330]/50 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65b330] focus-visible:ring-offset-2 focus-visible:ring-offset-black group ${
                    isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
                >
                  <Image
                    src={src}
                    alt={`Galería Safari ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setVerMas(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#65b330] px-6 py-3 text-white font-semibold text-sm shadow-lg shadow-[#65b330]/25 hover:bg-[#5aa02a] hover:scale-[1.02] transition-all duration-200"
                >
                  Ver más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
            {verMas && hasMore && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => setVerMas(false)}
                  className="text-gray-500 hover:text-[#65b330] text-sm font-medium transition-colors"
                >
                  Ver menos
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de la foto"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => ((i ?? 0) - 1 + galleryImages.length) % galleryImages.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-[#65b330] transition-colors"
            aria-label="Foto anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => ((i ?? 0) + 1) % galleryImages.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-[#65b330] transition-colors"
            aria-label="Siguiente foto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`Galería Safari ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </>
  );
}
