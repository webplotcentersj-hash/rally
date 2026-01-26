'use client';

import { useEffect, useRef } from 'react';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'autos' | 'motos' | 'cuatris' | null;
}

export default function CategoriesModal({ isOpen, onClose, type }: CategoriesModalProps) {
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

  if (!isOpen || !type) return null;

  const categoriasAutos = [
    '1 A libres',
    '2 B 1000',
    '4 C',
    '5 C plus',
    '6 D Plus',
    '7 D Especial',
    '8 RC5 8v',
    '9 RC5 16v',
    '10 E',
    '11 G',
    '12 Jeep Libres',
    '13 Fuerza Libre',
    '14 4X4',
    '15 Integrales',
    '16 UTV Aspirados',
    '17 UTV Turbos',
    'Mejor Vallisto',
    'GENERAL'
  ];

  const categoriasMotos = [
    '1 SENIOR',
    '2 JUNIOR',
    '3 MASTER A',
    '4 MASTER B',
    '5 MASTER C',
    '6 PROMOCIONALES',
    '7 JUNIOR Kids'
  ];

  const categoriasCuatris = [
    'Categoría Cuatris 1',
    'Categoría Cuatris 2',
    'Categoría Cuatris 3'
  ];

  const getTitle = () => {
    switch (type) {
      case 'autos':
        return '🚗 Categorías de Autos';
      case 'motos':
        return '🏍️ Categorías de Motos';
      case 'cuatris':
        return '🏎️ Categorías de Cuatris';
      default:
        return 'Categorías';
    }
  };

  const getCategories = () => {
    switch (type) {
      case 'autos':
        return categoriasAutos;
      case 'motos':
        return categoriasMotos;
      case 'cuatris':
        return categoriasCuatris;
      default:
        return [];
    }
  };

  const categories = getCategories();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b bg-gradient-to-r from-[#65b330] to-[#4a8a26]">
          <h2 className="text-xl md:text-2xl font-bold text-white">{getTitle()}</h2>
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

        {/* Contenido */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((categoria, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 hover:border-[#65b330] transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#65b330] rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{categoria}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-5 bg-gray-50 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-600">
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

