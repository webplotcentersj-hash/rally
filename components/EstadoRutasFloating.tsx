'use client';

import { useState, useEffect, useRef } from 'react';

const ROUTES = [
  {
    id: 'rn141',
    name: 'RN 141: Bermejo – Marayes',
    status: 'Corte preventivo todos los días de 19:00 a 7:00. Tránsito habilitado en horario diurno. Socavones, badenes con arrastre y banquinas descalzadas. Vialidad Nacional trabaja en una vía alternativa. La habilitación del tránsito nocturno se comunicará por canales oficiales cuando las condiciones lo permitan.',
    type: 'maxima',
  },
  {
    id: '1',
    name: 'RP 529: Ischigualasto',
    status: 'Transitable con precaución, hasta la tercera Estación (Cancha De Bochas).',
    type: 'precaucion',
  },
  {
    id: '2',
    name: 'Camino a Sierra de Elizondo',
    status: 'INTRANSITABLE por socavones y material de arrastre.',
    type: 'intransitable',
  },
  {
    id: '3',
    name: 'Camino Sierras de Riveros y Chaves',
    status: 'Transitable con máxima precaución.',
    type: 'maxima',
  },
  {
    id: '4',
    name: 'RP 503: Balde de Astica',
    status: 'Transitable con precaución. Equipos trabajando.',
    type: 'precaucion',
  },
  {
    id: '5',
    name: 'RP 523: Vº San Agustín a La Majadita',
    status: 'Transitable con precaución. Equipos trabajando.',
    type: 'precaucion',
  },
];

function getStatusStyles(type: string) {
  if (type === 'intransitable') {
    return 'border-red-500/50 bg-red-500/10 text-red-200';
  }
  if (type === 'maxima') {
    return 'border-amber-500/50 bg-amber-500/10 text-amber-200';
  }
  return 'border-[#65b330]/50 bg-[#65b330]/10 text-gray-200';
}

function formatDate(d: Date) {
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function EstadoRutasFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setDateTime({ date: formatDate(d), time: formatTime(d) });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

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
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('mousedown', handleOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('mousedown', handleOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#65b330] text-white shadow-lg hover:bg-[#5a9e2a] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#65b330] focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Ver estado de las rutas"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                Estado de las rutas
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                <p className="text-gray-400 capitalize">{dateTime.date}</p>
                <p className="text-[#65b330] font-mono font-semibold">{dateTime.time}</p>
              </div>

              <div className="space-y-3">
                {ROUTES.map((route) => (
                  <div
                    key={route.id}
                    className={`rounded-xl border px-4 py-3 ${getStatusStyles(route.type)}`}
                  >
                    <p className="font-semibold text-white text-sm md:text-base">
                      {route.name}
                    </p>
                    <p className="text-sm mt-1 opacity-95">
                      {route.status}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 pt-2">
                Información sujeta a cambios según condiciones. Circular con precaución.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
