/**
 * Actividades del cronograma (motos 6-8 feb) para mostrar "ahora" en la home.
 * Zona horaria: Argentina (UTC-3).
 */
export type CronogramaSlot = {
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  title: string;
  description?: string;
};

export const CRONOGRAMA_SLOTS: CronogramaSlot[] = [
  {
    date: '2026-02-06',
    start: '10:00',
    end: '21:00',
    title: 'Administrativas – Salón Cultural de Valle Fértil',
    description: 'Acreditaciones y trámites para pilotos inscriptos.',
  },
  {
    date: '2026-02-07',
    start: '08:00',
    end: '13:00',
    title: 'Administrativas – Circuito Coqui Quintana',
    description: 'Últimas acreditaciones y revisión de documentación.',
  },
  {
    date: '2026-02-07',
    start: '10:00',
    end: '11:00',
    title: 'Entrenamientos y clasificaciones – Campeonato Travesía',
    description: 'Apertura parque, cierre y reunión de pilotos.',
  },
  {
    date: '2026-02-07',
    start: '14:00',
    end: '15:00',
    title: 'Entrenamientos y clasificaciones – Junior Kids y Cuatris Kids',
    description: 'Apertura parque, cierre y reunión de pilotos.',
  },
  {
    date: '2026-02-07',
    start: '16:00',
    end: '17:00',
    title: 'Entrenamientos y clasificaciones – Campeonato Enduro',
    description: 'Apertura parque, cierre y reunión de pilotos.',
  },
  {
    date: '2026-02-08',
    start: '08:00',
    end: '09:00',
    title: 'Carreras – Campeonato Travesía',
    description: 'Parque cerrado y reunión para engrillar y largar.',
  },
  {
    date: '2026-02-08',
    start: '11:00',
    end: '12:00',
    title: 'Carreras – Junior Kids y Cuatris Kids',
    description: 'Parque cerrado y reunión para engrillar y largar.',
  },
  {
    date: '2026-02-08',
    start: '13:00',
    end: '19:00',
    title: 'Carreras – Campeonato Enduro y entrega de premios',
    description: 'Carreras y ceremonia de premiación (aprox. 18:30 hs).',
  },
];

/** Fecha/hora de inicio del primer evento (para el countdown). Argentina UTC-3 */
export const FIRST_EVENT_DATE = new Date('2026-02-06T10:00:00-03:00').getTime();

/**
 * Indica si "now" está dentro del rango del Safari motos (6-8 feb 2026).
 */
function isDuringEvent(now: Date): boolean {
  const arStart = new Date('2026-02-06T00:00:00-03:00').getTime();
  const arEnd = new Date('2026-02-08T23:59:59-03:00').getTime();
  const t = now.getTime();
  return t >= arStart && t <= arEnd;
}

/**
 * Parsea "YYYY-MM-DD" y "HH:mm" en Argentina (-03:00) y devuelve timestamp.
 */
function parseSlotTime(dateStr: string, timeStr: string): number {
  return new Date(`${dateStr}T${timeStr}:00-03:00`).getTime();
}

/**
 * Devuelve la actividad del cronograma que está en curso en este momento (hora Argentina).
 * Si el usuario está en otra zona, usamos su hora local como aproximación.
 */
export function getCurrentActivity(now: Date = new Date()): CronogramaSlot | null {
  if (!isDuringEvent(now)) return null;

  const t = now.getTime();
  for (const slot of CRONOGRAMA_SLOTS) {
    const start = parseSlotTime(slot.date, slot.start);
    const end = parseSlotTime(slot.date, slot.end);
    if (t >= start && t <= end) return slot;
  }
  return null;
}

/** Fin del último evento (8 feb 2026 19:00 Argentina) */
const LAST_EVENT_END = new Date('2026-02-08T19:00:00-03:00').getTime();

/**
 * True si "now" ya pasó el fin del Safari motos (8 feb).
 */
export function isAfterEvent(now: Date): boolean {
  return now.getTime() > LAST_EVENT_END;
}

/**
 * Devuelve la próxima actividad (la que aún no empezó) en el cronograma.
 * Útil para mostrar "Próxima actividad: X a las HH:mm" cuando estamos en el evento pero entre slots.
 */
export function getNextActivity(now: Date = new Date()): CronogramaSlot | null {
  if (!isDuringEvent(now) || isAfterEvent(now)) return null;

  const t = now.getTime();
  for (const slot of CRONOGRAMA_SLOTS) {
    const start = parseSlotTime(slot.date, slot.start);
    if (t < start) return slot;
  }
  return null;
}
