'use client';

import Link from 'next/link';
import Header from '@/components/Header';

type Slot = {
  time: string;
  title: string;
  description?: string;
  highlight?: 'travesia' | 'kids' | 'enduro' | 'general';
};

type DayBlock = {
  label: string;
  subtitle: string;
  description?: string;
  slots: Slot[];
};

const adminBlocks: DayBlock[] = [
  {
    label: 'Viernes 06/02',
    subtitle: 'Administrativas – 1ª fecha Enduro ASER 2026 y Travesía 2026',
    slots: [
      {
        time: '10:00 – 21:00 hs',
        title: 'Administrativas Salón Cultural de Valle Fértil',
        description: 'Acreditaciones y trámites para pilotos inscriptos.',
        highlight: 'general',
      },
    ],
  },
  {
    label: 'Sábado 07/02',
    subtitle: 'Administrativas – Circuito Coqui Quintana',
    slots: [
      {
        time: '08:00 – 13:00 hs',
        title: 'Administrativas en circuito Coqui Quintana',
        description: 'Últimas acreditaciones y revisión de documentación.',
        highlight: 'general',
      },
    ],
  },
];

const saturdayBlocks: DayBlock[] = [
  {
    label: 'Sábado 07/02',
    subtitle: 'Entrenamientos y clasificaciones – Campeonato Travesía',
    slots: [
      {
        time: '10:00 hs',
        title: 'Apertura parque cerrado',
        description: 'Categorías Campeonato TRAVESÍA.',
        highlight: 'travesia',
      },
      {
        time: '10:30 hs',
        title: 'Cierre de parque cerrado',
        description: 'Categorías Campeonato TRAVESÍA.',
        highlight: 'travesia',
      },
      {
        time: '10:35 hs',
        title: 'Reunión de pilotos',
        description: 'Con equipo listo para ENTRENAR y CLASIFICAR.',
        highlight: 'travesia',
      },
    ],
  },
  {
    label: 'Sábado 07/02',
    subtitle: 'Entrenamientos y clasificaciones – Junior Kids y Cuatris Kids',
    slots: [
      {
        time: '14:00 hs',
        title: 'Apertura parque cerrado',
        description: 'JUNIOR KIDS y CUATRIS KIDS.',
        highlight: 'kids',
      },
      {
        time: '14:30 hs',
        title: 'Cierre de parque cerrado',
        description: 'JUNIOR KIDS y CUATRIS KIDS.',
        highlight: 'kids',
      },
      {
        time: '14:35 hs',
        title: 'Reunión de pilotos',
        description: 'Con equipo listo para ENTRENAR y CLASIFICAR.',
        highlight: 'kids',
      },
    ],
  },
  {
    label: 'Sábado 07/02',
    subtitle: 'Entrenamientos y clasificaciones – Campeonato Enduro',
    slots: [
      {
        time: '16:00 hs',
        title: 'Apertura parque cerrado',
        description: 'Categorías Campeonato ENDURO.',
        highlight: 'enduro',
      },
      {
        time: '16:30 hs',
        title: 'Cierre de parque cerrado',
        description: 'Categorías Campeonato ENDURO.',
        highlight: 'enduro',
      },
      {
        time: '16:35 hs',
        title: 'Reunión de pilotos',
        description: 'Con equipo listo para ENTRENAR y CLASIFICAR.',
        highlight: 'enduro',
      },
    ],
  },
];

const sundayBlocks: DayBlock[] = [
  {
    label: 'Domingo 08/02',
    subtitle: 'Carreras – Campeonato Travesía',
    slots: [
      {
        time: '08:00 hs',
        title: 'Apertura parque cerrado',
        description: 'Categorías Campeonato TRAVESÍA.',
        highlight: 'travesia',
      },
      {
        time: '08:30 hs',
        title: 'Cierre de parque cerrado',
        description: 'Categorías Campeonato TRAVESÍA.',
        highlight: 'travesia',
      },
      {
        time: '08:35 hs',
        title: 'Reunión de pilotos',
        description: 'Con equipo listo para ENGRILLAR y LARGAR.',
        highlight: 'travesia',
      },
    ],
  },
  {
    label: 'Domingo 08/02',
    subtitle: 'Carreras – Junior Kids y Cuatris Kids',
    slots: [
      {
        time: '11:00 hs',
        title: 'Apertura parque cerrado',
        description: 'JUNIOR KIDS y CUATRIS KIDS.',
        highlight: 'kids',
      },
      {
        time: '11:30 hs',
        title: 'Cierre de parque cerrado',
        description: 'JUNIOR KIDS y CUATRIS KIDS.',
        highlight: 'kids',
      },
      {
        time: '11:35 hs',
        title: 'Reunión de pilotos',
        description: 'Con equipo listo para ENGRILLAR y LARGAR.',
        highlight: 'kids',
      },
    ],
  },
  {
    label: 'Domingo 08/02',
    subtitle: 'Carreras – Campeonato Enduro',
    slots: [
      {
        time: '13:00 hs',
        title: 'Apertura parque cerrado',
        description: 'Categorías Campeonato ENDURO.',
        highlight: 'enduro',
      },
      {
        time: '13:30 hs',
        title: 'Cierre de parque cerrado',
        description: 'Categorías Campeonato ENDURO.',
        highlight: 'enduro',
      },
      {
        time: '13:35 hs',
        title: 'Reunión de pilotos',
        description: 'Con equipo listo para ENGRILLAR y LARGAR.',
        highlight: 'enduro',
      },
      {
        time: '18:30 hs',
        title: 'Entrega de premios',
        description: 'Ceremonia de premiación (horario aproximado).',
        highlight: 'general',
      },
    ],
  },
];

function getHighlightClass(highlight?: Slot['highlight']) {
  if (highlight === 'travesia') {
    return 'border-amber-400/70 bg-amber-500/5';
  }
  if (highlight === 'kids') {
    return 'border-sky-400/70 bg-sky-500/5';
  }
  if (highlight === 'enduro') {
    return 'border-emerald-400/70 bg-emerald-500/5';
  }
  return 'border-white/10 bg-white/5';
}

export default function CronogramaPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {/* Fondo con gradientes y rejilla, similar a Tiempos/Circuitos */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#050805] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(101,179,48,0.14),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <Header />

      <div className="relative pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in-up">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#7dd340] transition-all mb-8 text-sm font-medium uppercase tracking-widest"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#65b330]/20 border border-[#65b330]/40 mb-6 shadow-[0_0_40px_rgba(101,179,48,0.2)]">
                <svg className="w-10 h-10 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V5a3 3 0 013-3h2a3 3 0 013 3v2m-8 0h8m-8 0a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2m-8 0V5m8 2V5"
                  />
                </svg>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 title-section tracking-tight drop-shadow-lg">
                Cronograma
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-6">
                Horarios oficiales del fin de semana del Safari Tras las Sierras. Administrativas, entrenamientos,
                clasificaciones y carreras, organizados por día y tipo de campeonato.
              </p>

              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-24 bg-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#65b330]" />
              </div>
            </div>

            {/* Administrativas */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Administrativas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminBlocks.map((block) => (
                  <article
                    key={block.label}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-[#101910]/90 shadow-xl shadow-black/40"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(101,179,48,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(101,179,48,0.12),transparent_40%)]" />
                    <div className="relative p-6 md:p-7 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-black/40 border border-white/15 text-gray-200">
                          {block.label}
                        </span>
                        <span className="text-xs font-medium text-[#a3ff6f] uppercase tracking-wide">
                          Administrativas
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {block.subtitle}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-200">
                        {block.slots.map((slot) => (
                          <li key={slot.time} className="flex items-start gap-3">
                            <span className="font-mono text-xs md:text-sm text-[#a3ff6f] bg-black/50 border border-[#65b330]/40 rounded-md px-2 py-1">
                              {slot.time}
                            </span>
                            <div>
                              <p className="font-semibold text-white text-sm md:text-base">
                                {slot.title}
                              </p>
                              {slot.description && (
                                <p className="text-xs md:text-sm text-gray-300 mt-0.5">
                                  {slot.description}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Sábado – Entrenamientos y clasificaciones */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Sábado 07/02 – Entrenamientos y clasificaciones
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6">
                Solo podrán entrenar y clasificar los pilotos inscriptos. Habrá horario extendido únicamente para
                quienes no puedan llegar antes y deban inscribirse para correr el domingo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {saturdayBlocks.map((block) => (
                  <article
                    key={block.subtitle}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl shadow-black/40"
                  >
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(101,179,48,0.3),transparent_55%)]" />
                    <div className="relative p-6 space-y-3">
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#a3ff6f] bg-black/60 border border-[#65b330]/50 rounded-full px-3 py-1">
                        {block.label}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {block.subtitle}
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-100">
                        {block.slots.map((slot) => (
                          <li
                            key={slot.time + slot.title}
                            className={`rounded-xl border px-3 py-2 bg-black/40 ${getHighlightClass(slot.highlight)}`}
                          >
                            <p className="font-mono text-xs text-[#a3ff6f] mb-0.5">
                              {slot.time}
                            </p>
                            <p className="font-semibold text-white text-sm">
                              {slot.title}
                            </p>
                            {slot.description && (
                              <p className="text-xs text-gray-300 mt-0.5">
                                {slot.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Domingo – Carreras */}
            <section className="mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Domingo 08/02 – Carreras
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6">
                El domingo se larga según la clasificación del día sábado. Se respetan los horarios y regulaciones
                vigentes de ASER.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sundayBlocks.map((block) => (
                  <article
                    key={block.subtitle}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl shadow-black/40"
                  >
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom,rgba(101,179,48,0.3),transparent_55%)]" />
                    <div className="relative p-6 space-y-3">
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#a3ff6f] bg-black/60 border border-[#65b330]/50 rounded-full px-3 py-1">
                        {block.label}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {block.subtitle}
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-100">
                        {block.slots.map((slot) => (
                          <li
                            key={slot.time + slot.title}
                            className={`rounded-xl border px-3 py-2 bg-black/40 ${getHighlightClass(slot.highlight)}`}
                          >
                            <p className="font-mono text-xs text-[#a3ff6f] mb-0.5">
                              {slot.time}
                            </p>
                            <p className="font-semibold text-white text-sm">
                              {slot.title}
                            </p>
                            {slot.description && (
                              <p className="text-xs text-gray-300 mt-0.5">
                                {slot.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Nota final */}
            <div className="rounded-2xl border border-white/10 bg-black/70 px-5 py-4 text-xs md:text-sm text-gray-300">
              Se respetarán los horarios de este cronograma y las reglamentaciones vigentes de ASER. Los horarios y
              tandas están sujetos a cambios según la cantidad de pilotos, necesidades de organización y seguridad.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

