'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchCategorias, DEFAULT_CATEGORIAS, type CategoriasData } from '@/lib/categorias-api';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'autos' | 'motos' | 'cuatris' | null;
}

export default function CategoriesModal({ isOpen, onClose, type }: CategoriesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CategoriasData>(DEFAULT_CATEGORIAS);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchCategorias().then(setData).catch(() => setData(DEFAULT_CATEGORIAS));
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
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
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

  if (!isOpen || !type) return null;

  const getTitle = () => {
    switch (type) {
      case 'autos': return '🚗 Categorías de Autos';
      case 'motos': return '🏍️ Categorías de Motos';
      case 'cuatris': return '🏎️ Categorías de Cuatris';
      default: return 'Categorías';
    }
  };

  const categories = type === 'autos' ? data.autos : type === 'motos' ? data.motos : data.cuatris;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#65b330] to-[#4a8a26] flex-shrink-0">
          <h2 className="text-lg font-bold text-white">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-full flex-shrink-0"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className="overflow-y-auto p-4"
          style={{ maxHeight: 'calc(80vh - 120px)', minHeight: '200px' }}
        >
          <div className="grid grid-cols-1 gap-3">
            {categories.map((categoria, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border-2 border-gray-200 hover:border-[#65b330] transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-[#65b330] rounded-full p-1.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{categoria}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-gray-50 border-t flex-shrink-0">
          <div className="text-center">
            <p className="text-xs text-gray-600">
              Para más información sobre las categorías,{' '}
              <a
                href="https://safari-ashen.vercel.app/inscripcion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#65b330] font-semibold hover:underline"
              >
                inscribite aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
