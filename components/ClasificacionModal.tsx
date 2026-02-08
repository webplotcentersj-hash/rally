'use client';

import { useEffect, useRef } from 'react';

interface ClasificacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  pdfUrl: string;
  pdfNombreDescarga: string;
}

export default function ClasificacionModal({
  isOpen,
  onClose,
  titulo,
  pdfUrl,
  pdfNombreDescarga,
}: ClasificacionModalProps) {
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
      if (e.key === 'Escape') onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-gray-900 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/60">
          <h2 className="text-lg md:text-xl font-bold text-white">{titulo} – Clasificación completa</h2>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download={pdfNombreDescarga}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#65b330] text-white font-semibold text-sm hover:bg-[#5aa02a] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar PDF
            </a>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 min-h-[60vh] w-full">
            <iframe
              src={`${pdfUrl}#view=FitH`}
              title={titulo}
              className="w-full h-full min-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
