'use client';

import { useEffect, useRef } from 'react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapModal({ isOpen, onClose }: MapModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // URL mejorada de Google Maps para Valle Fértil, San Juan
  // Coordenadas aproximadas: -30.6333° S, -67.4667° W
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.5!2d-67.4667!3d-30.6333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9682111111111111%3A0x1111111111111111!2sValle%20F%C3%A9rtil%2C%20San%20Juan%20Province%2C%20Argentina!5e0!3m2!1ses!2sar!4v1706200000000!5m2!1ses!2sar";
  const googleMapsLink = "https://www.google.com/maps/dir/San+Juan+Capital,+San+Juan,+Argentina/Valle+Fértil,+San+Juan+Province,+Argentina/@-31.085,-68.0,9z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x9682111111111111:0x1111111111111111!2m2!1d-68.5364!2d-31.5375!1m5!1m1!1s0x9682111111111111:0x1111111111111111!2m2!1d-67.4667!2d-30.6333!3e0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header mejorado */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b bg-gradient-to-r from-[#65b330] to-[#4a8a26]">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <h2 className="text-xl md:text-2xl font-bold text-white">Cómo llegar a Valle Fértil</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-full"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Información de distancia destacada */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 md:p-5 border-b">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#65b330] rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Distancia desde</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">San Juan Capital</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Aproximadamente</p>
                <p className="text-2xl md:text-3xl font-bold text-[#65b330]">160 km</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Tiempo estimado</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">2h 30min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa mejorado */}
        <div className="relative w-full flex-grow bg-gray-200 min-h-[400px]">
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '500px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Valle Fértil, San Juan"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>

        {/* Footer con acciones */}
        <div className="p-4 md:p-5 bg-gray-50 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base font-semibold text-gray-900">
                Valle Fértil, San Juan, Argentina
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Coordenadas: -30.6° S, -67.5° W
              </p>
            </div>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#65b330] text-white font-semibold rounded-lg hover:bg-[#5aa02a] transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Abrir ruta en Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

