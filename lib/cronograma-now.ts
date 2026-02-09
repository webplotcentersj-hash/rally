/**
 * Actividades del cronograma (autos 13-15 feb) para mostrar "ahora" en la home.
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
    date: '2026-02-13',
    start: '18:00',
    end: '19:30',
    title: 'Reunión obligatoria – Salón Cultural Municipal',
    description: 'Charla AAV (José María Andruccetti). Asistencia obligatoria pilotos o copilotos.',
  },
  {
    date: '2026-02-13',
    start: '21:00',
    end: '22:00',
    title: 'Largada simbólica – Circuito Coqui Quintana',
    description: 'Viernes 13/02.',
  },
  {
    date: '2026-02-14',
    start: '09:00',
    end: '11:30',
    title: 'Sábado – Primer Prime (36 km)',
    description: 'Primer Prime 09:00 hs.',
  },
  {
    date: '2026-02-14',
    start: '12:00',
    end: '14:00',
    title: 'Sábado – Segundo Prime (10 km)',
    description: 'Segundo Prime 12:00 hs.',
  },
  {
    date: '2026-02-15',
    start: '09:00',
    end: '12:00',
    title: 'Domingo – Prime único (30 km)',
    description: 'Prime único 09:00 hs. Resultados en TIEMPOS – RC Cronos.',
  },
  {
    date: '2026-02-15',
    start: '17:00',
    end: '18:30',
    title: 'Podio – Ceremonia de premiación',
    description: '17:00 hs.',
  },
];

/** Fecha/hora de inicio del primer evento (reunión obligatoria 13 feb 18:00). Argentina UTC-3 */
export const FIRST_EVENT_DATE = new Date('2026-02-13T18:00:00-03:00').getTime();

function isDuringEvent(now: Date): boolean {
  const arStart = new Date('2026-02-13T00:00:00-03:00').getTime();
  const arEnd = new Date('2026-02-15T23:59:59-03:00').getTime();
  const t = now.getTime();
  return t >= arStart && t <= arEnd;
}

function parseSlotTime(dateStr: string, timeStr: string): number {
  return new Date(`${dateStr}T${timeStr}:00-03:00`).getTime();
}

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

const LAST_EVENT_END = new Date('2026-02-15T18:30:00-03:00').getTime();

export function isAfterEvent(now: Date): boolean {
  return now.getTime() > LAST_EVENT_END;
}

export function getNextActivity(now: Date = new Date()): CronogramaSlot | null {
  if (!isDuringEvent(now) || isAfterEvent(now)) return null;

  const t = now.getTime();
  for (const slot of CRONOGRAMA_SLOTS) {
    const start = parseSlotTime(slot.date, slot.start);
    if (t < start) return slot;
  }
  return null;
}
