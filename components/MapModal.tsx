'use client';

import { useEffect } from 'react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapModal({ isOpen, onClose }: MapModalProps) {
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

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#65b330]">
          <h2 className="text-xl md:text-2xl font-bold text-white">Cómo llegar a Valle Fértil</h2>
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

        {/* Mapa */}
        <div className="relative w-full h-[70vh] md:h-[80vh] bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.5!2d-67.5!3d-30.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDM2JzAwLjAiUyA2NycwMCcwMC4wIlc!5e0!3m2!1ses!2sar!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Mapa de Valle Fértil, San Juan"
          ></iframe>
          {/* Link alternativo para abrir en Google Maps */}
          <div className="absolute bottom-4 right-4 z-10">
            <a
              href="https://www.google.com/maps/search/Valle+Fértil,+San+Juan,+Argentina/@-30.6,-67.5,12z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Abrir en Google Maps
            </a>
          </div>
        </div>

        {/* Información adicional */}
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-700 text-center">
            <strong>Valle Fértil, San Juan, Argentina</strong>
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Coordenadas: -30.6° S, -67.5° W
          </p>
        </div>
      </div>
    </div>
  );
}

