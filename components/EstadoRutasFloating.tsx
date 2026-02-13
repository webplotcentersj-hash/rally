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

const PARTE_PRENSA = `PARTE DE PRENSA – APELACIÓN A LA RESPONSABILIDAD DE LOS USUARIOS DE RUTAS NACIONALES

Vialidad Nacional, en forma conjunta con Gendarmería Nacional y el Gobierno de la Provincia de San Juan, informa a la población que se mantiene el cierre preventivo nocturno de la Ruta Nacional 141, en el horario comprendido entre las 19:00 horas y las 07:00 horas del día siguiente, por estrictos motivos de seguridad vial y preservación de la vida humana.

La decisión adoptada responde a hechos concretos ocurridos durante los recientes eventos climáticos. Durante una fuerte tormenta con bajada de creciente, personal de Vialidad Nacional y de Gendarmería Nacional advirtió reiteradamente a los conductores que no era seguro cruzar los badenes. A pesar de ello, un automovilista decidió avanzar y fue arrastrado por la corriente, impactando su vehículo contra un alambrado, debiendo ser rescatado por un maquinista de Vialidad Nacional, evitando así consecuencias fatales.

Si bien actualmente no se registran tormentas, la Ruta Nacional 141 presenta daños severos, con sectores de la calzada socavados y carcomidos, reduciendo significativamente las condiciones de seguridad. Circular en horario nocturno incrementa exponencialmente el riesgo, ya que disminuye la visibilidad, aun con señalización instalada, y aumenta la posibilidad de que no se adviertan zonas peligrosas, erosiones profundas o descalces de la calzada.

Vialidad Nacional comprende la importancia estratégica de la Ruta Nacional 141, especialmente para el tránsito de transporte pesado y de pasajeros. Por tal motivo, se trabaja contrarreloj en la construcción de una huella alternativa, que permitirá garantizar una transitabilidad permanente en los próximos días, antes del fin de semana próximo. Estas tareas implican trabajos complejos sobre terreno inestable, greda y barro, con equipos viales que incluso han quedado enterrados durante las labores y que han sido recuperados gracias al esfuerzo del personal técnico y operativo.

El corte preventivo nocturno, que puede generar molestias, tiene como único objetivo salvaguardar la vida de quienes transitan la ruta, así como también proteger la labor de los trabajadores y evitar consecuencias administrativas, civiles o judiciales derivadas de siniestros evitables.

Se solicita a la población paciencia y comprensión, y planificar los traslados teniendo en cuenta que la única vía segura de conexión con el departamento de Valle Fértil, después de las 19 horas, es la Ruta Nacional 150, previendo combustible y tiempos de viaje adicionales, pero con la tranquilidad de arribar en condiciones seguras.

Se recuerda que la circulación se encuentra habilitada entre las 07:00 y las 19:00 horas, bajo condiciones de obra y con extrema precaución, hasta tanto se finalicen los trabajos en ejecución.

Vialidad Nacional, Gendarmería Nacional y el Gobierno de la Provincia reiteran que todas las decisiones adoptadas responden exclusivamente a la protección de la vida, la integridad física de las personas y la seguridad vial, y agradecen la colaboración y responsabilidad de todos los usuarios.`;

export default function EstadoRutasFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPrensaOpen, setIsPrensaOpen] = useState(false);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const modalRef = useRef<HTMLDivElement>(null);
  const prensaModalRef = useRef<HTMLDivElement>(null);

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
    if (isOpen || isPrensaOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isPrensaOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPrensaOpen) setIsPrensaOpen(false);
        else setIsOpen(false);
      }
    };
    const handleOutside = (e: MouseEvent) => {
      if (isPrensaOpen && prensaModalRef.current && !prensaModalRef.current.contains(e.target as Node)) {
        setIsPrensaOpen(false);
      } else if (!isPrensaOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
  }, [isOpen, isPrensaOpen]);

  return (
    <>
      {/* Botón flotante */}
      <button
        id="open-rutas"
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden w-12 h-12 items-center justify-center rounded-full bg-[#65b330] text-white shadow-lg hover:bg-[#5a9e2a] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#65b330] focus:ring-offset-2 focus:ring-offset-black md:flex"
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

              {/* Parte de prensa – destacado */}
              <button
                type="button"
                onClick={() => setIsPrensaOpen(true)}
                className="w-full mt-4 rounded-xl border-2 border-amber-500/80 bg-amber-500/20 px-4 py-4 text-left hover:bg-amber-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 rounded-full bg-amber-500/30 p-2" aria-hidden>
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-7.15M11 5.882V19.24a1.76 1.76 0 003.417.592l2.147-7.15M11 5.882V19.24a1.76 1.76 0 013.417.592l-2.147-7.15" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-amber-200 text-sm uppercase tracking-wide">
                      Parte de prensa
                    </p>
                    <p className="text-amber-100/90 text-sm mt-0.5">
                      Apelación a la responsabilidad de los usuarios de rutas nacionales – RN 141
                    </p>
                    <p className="text-amber-400/80 text-xs mt-2 font-medium">
                      Leer comunicado completo →
                    </p>
                  </div>
                </div>
              </button>

              <p className="text-xs text-gray-500 pt-2">
                Información sujeta a cambios según condiciones. Circular con precaución.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Parte de prensa – encima del modal de rutas */}
      {isPrensaOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div
            ref={prensaModalRef}
            className="relative bg-gray-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-amber-500/30 bg-amber-500/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex-shrink-0 rounded-full bg-amber-500/30 p-2">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-7.15M11 5.882V19.24a1.76 1.76 0 003.417.592l2.147-7.15M11 5.882V19.24a1.76 1.76 0 013.417.592l-2.147-7.15" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-amber-100 uppercase tracking-wide">
                    Parte de prensa
                  </h3>
                  <p className="text-sm text-amber-200/80 truncate">
                    Apelación a la responsabilidad – RN 141
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPrensaOpen(false)}
                className="flex-shrink-0 p-2 rounded-lg text-amber-200 hover:text-white hover:bg-amber-500/20 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 overflow-y-auto prose prose-invert prose-sm max-w-none">
              <div className="text-gray-300 space-y-4 whitespace-pre-line">
                {PARTE_PRENSA.split(/\n\n+/).map((paragraph, i) => (
                  <p key={i} className={i === 0 ? 'font-semibold text-amber-100 text-base' : ''}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
