'use client';

import { useEffect, useRef } from 'react';

interface LiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveModal({ isOpen, onClose }: LiveModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b bg-gradient-to-r from-red-600 to-red-700">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-white animate-pulse" aria-hidden />
            <h2 className="text-xl md:text-2xl font-bold text-white">Safari en vivo</h2>
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

        {/* Contenido: video Etapa 1 */}
        <div className="p-4 md:p-5">
          <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: '855/481' }}>
            <iframe
              src="https://www.youtube.com/embed/-FXwBt-uJwA"
              title="SAFARI TRAS LAS SIERRA 2026 | ETAPA 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
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
