'use client';

import Link from 'next/link';
import Header from '@/components/Header';

type Slot = {
  time: string;
  title: string;
  description?: string;
};

type DayBlock = {
  label: string;
  subtitle: string;
  slots: Slot[];
};

const reunionBlock: DayBlock = {
  label: 'Viernes 13/02',
  subtitle: 'Reunión obligatoria – Valle Fértil',
  slots: [
    {
      time: '18:00 hs',
      title: 'Charla obligatoria en Salón Cultural Municipal',
      description:
        'A cargo de José María Andruccetti de la AAV (Asociación Argentina de Volantes). ASISTENCIA OBLIGATORIA PARA PILOTOS O COPILOTOS.',
    },
  ],
};

const viernesBlock: DayBlock = {
  label: 'Viernes 13/02',
  subtitle: 'Largada simbólica',
  slots: [
    {
      time: '21:00 hs',
      title: 'Largada simbólica',
      description: 'Circuito Coqui Quintana.',
    },
  ],
};

const sabadoBlocks: DayBlock[] = [
  {
    label: 'Sábado 14/02',
    subtitle: 'Primer Prime',
    slots: [{ time: '09:00 hs', title: 'Primer Prime', description: 'Extensión 36 km.' }],
  },
  {
    label: 'Sábado 14/02',
    subtitle: 'Segundo Prime',
    slots: [{ time: '12:00 hs', title: 'Segundo Prime', description: 'Extensión 10 km.' }],
  },
];

const domingoBlocks: DayBlock[] = [
  {
    label: 'Domingo 15/02',
    subtitle: 'Prime único',
    slots: [{ time: '09:00 hs', title: 'Prime único', description: 'Extensión 30 km.' }],
  },
  {
    label: 'Domingo 15/02',
    subtitle: 'Resultados y podio',
    slots: [
      { time: '—', title: 'Resultados oficiales', description: 'Publicados en TIEMPOS – RC Cronos.' },
      { time: '17:00 hs', title: 'Podio', description: 'Ceremonia de premiación.' },
    ],
  },
];

const IconReunion = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconFlag = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconTrophy = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default function CronogramaPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#030803] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(101,179,48,0.18),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.06)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

      <Header />

      <div className="relative pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-20 animate-fade-in-up">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#8ee04a] transition-all mb-8 text-sm font-medium uppercase tracking-widest"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#65b330]/50 bg-[#65b330]/10 text-[#a3ff6f] text-sm font-semibold uppercase tracking-wider mb-8">
                <span>13</span>
                <span className="w-1 h-1 rounded-full bg-[#65b330]" />
                <span>14</span>
                <span className="w-1 h-1 rounded-full bg-[#65b330]" />
                <span>15 Feb 2026</span>
              </div>

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[#65b330]/30 to-[#65b330]/5 border border-[#65b330]/50 mb-6 shadow-[0_0_60px_rgba(101,179,48,0.25)]">
                <svg className="w-12 h-12 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V5a3 3 0 013-3h2a3 3 0 013 3v2m-8 0h8m-8 0a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2m-8 0V5m8 2V5"
                  />
                </svg>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 title-section tracking-tight drop-shadow-lg">
                Cronograma
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
                Safari Tras las Sierras – Autos. Reunión obligatoria, largada simbólica, primes y podio.
              </p>
              <p className="text-[#65b330]/90 text-sm font-medium mt-1">Valle Fértil, San Juan</p>
            </div>

            {/* Reunión obligatoria */}
            <section className="mb-20 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <IconReunion />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Reunión obligatoria
                </h2>
              </div>
              <article className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-black/50 to-[#1a1505]/90 shadow-xl shadow-amber-900/20 transition-all duration-300 hover:shadow-amber-500/10 hover:border-amber-500/50">
                <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl bg-amber-500/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
                  Obligatorio
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.2),transparent_50%)]" />
                <div className="relative p-6 md:p-8 space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-black/50 border border-amber-500/40 text-amber-200">
                    {reunionBlock.label}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{reunionBlock.subtitle}</h3>
                  <p className="text-amber-100/90 text-sm md:text-base">
                    Atención: el día Viernes 13/02, 18:00 hs en el Salón Cultural Municipal habrá una charla obligatoria
                    de José María Andruccetti de la AAV (Asociación Argentina de Volantes) para Pilotos o Copilotos.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-200">
                    {reunionBlock.slots.map((slot) => (
                      <li key={slot.time} className="flex items-start gap-4">
                        <span className="font-mono text-sm text-amber-300 bg-black/60 border border-amber-500/30 rounded-lg px-3 py-1.5 shrink-0">
                          {slot.time}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{slot.title}</p>
                          {slot.description && (
                            <p className="text-gray-300 mt-0.5">{slot.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="text-amber-300 font-semibold uppercase tracking-wide text-sm pt-1">
                    Asistencia obligatoria para pilotos o copilotos.
                  </p>
                </div>
              </article>
            </section>

            {/* Posición de largada + Largada: dos columnas en desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              <section className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#a3ff6f]">
                    <IconFlag />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Posición de largada
                  </h2>
                </div>
                <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-7 text-gray-200 text-sm md:text-base leading-relaxed space-y-3 transition-all duration-300 hover:border-white/25">
                  <p>
                    En cada categoría: 1° larga el ganador 2025, 2° larga el ganador 2024. De no participar se van
                    tomando las posiciones siguientes. Se completan los dos primeros lugares y del tercero para atrás por
                    orden de inscripción.
                  </p>
                  <p>
                    El <strong className="text-white">Comisario Deportivo</strong> puede cambiar posiciones si así lo
                    cree necesario.
                  </p>
                </div>
              </section>

              <section className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#65b330]/20 border border-[#65b330]/50 text-[#65b330]">
                    <IconFlag />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Largada
                  </h2>
                </div>
                <div className="rounded-2xl border-2 border-[#65b330]/50 bg-gradient-to-br from-[#65b330]/15 to-[#65b330]/5 p-6 md:p-7 transition-all duration-300 hover:border-[#65b330]/70 hover:shadow-[0_0_30px_rgba(101,179,48,0.15)]">
                  <p className="text-white font-semibold text-lg">
                    Auto 0: Juan Pablo Batista + Auto Policía (Jefe Operativo).
                  </p>
                </div>
              </section>
            </div>

            {/* Timeline: Viernes · Sábado · Domingo */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#65b330]/60" />
              <span className="text-[#65b330] font-semibold uppercase tracking-widest text-sm">13 · 14 · 15 Feb</span>
              <span className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#65b330]/60" />
            </div>

            {/* Viernes 13/02 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <IconCalendar />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Viernes 13/02
                </h2>
              </div>
              <article className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-black/60 shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-900/20">
                <div className="relative p-6 md:p-7 space-y-4">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wide text-amber-300 bg-amber-500/20 border border-amber-500/40 rounded-full px-3 py-1.5">
                    {viernesBlock.label}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{viernesBlock.subtitle}</h3>
                  <ul className="space-y-3">
                    {viernesBlock.slots.map((slot) => (
                      <li key={slot.time} className="flex items-start gap-4">
                        <span className="font-mono text-sm text-[#a3ff6f] bg-black/60 border border-[#65b330]/40 rounded-lg px-3 py-1.5 shrink-0">
                          {slot.time}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{slot.title}</p>
                          {slot.description && (
                            <p className="text-gray-300 text-sm mt-0.5">{slot.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>

            {/* Sábado 14/02 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#65b330]/20 border border-[#65b330]/50 text-[#65b330]">
                  <IconCalendar />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Sábado 14/02
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sabadoBlocks.map((block, i) => (
                  <article
                    key={block.subtitle}
                    className="relative overflow-hidden rounded-2xl border border-[#65b330]/30 bg-black/60 shadow-xl transition-all duration-300 hover:border-[#65b330]/50 hover:shadow-[0_0_30px_rgba(101,179,48,0.12)]"
                  >
                    <div className="relative p-6 md:p-7 space-y-4">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#a3ff6f] bg-[#65b330]/20 border border-[#65b330]/40 rounded-full px-3 py-1.5">
                        {block.label}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{block.subtitle}</h3>
                      <ul className="space-y-3 text-sm text-gray-100">
                        {block.slots.map((slot) => (
                          <li key={slot.time} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3">
                            <p className="font-mono text-xs text-[#a3ff6f] mb-1">{slot.time}</p>
                            <p className="font-semibold text-white">{slot.title}</p>
                            {slot.description && (
                              <p className="text-gray-300 text-xs mt-0.5">{slot.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Domingo 15/02 */}
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#65b330]/20 border border-[#65b330]/50 text-[#65b330]">
                  <IconTrophy />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Domingo 15/02
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {domingoBlocks.map((block) => (
                  <article
                    key={block.subtitle}
                    className="relative overflow-hidden rounded-2xl border border-[#65b330]/30 bg-black/60 shadow-xl transition-all duration-300 hover:border-[#65b330]/50 hover:shadow-[0_0_30px_rgba(101,179,48,0.12)]"
                  >
                    <div className="relative p-6 md:p-7 space-y-4">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#a3ff6f] bg-[#65b330]/20 border border-[#65b330]/40 rounded-full px-3 py-1.5">
                        {block.label}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{block.subtitle}</h3>
                      <ul className="space-y-3 text-sm text-gray-100">
                        {block.slots.map((slot) => (
                          <li key={slot.time + (slot.title || '')} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3">
                            <p className="font-mono text-xs text-[#a3ff6f] mb-1">{slot.time}</p>
                            <p className="font-semibold text-white">{slot.title}</p>
                            {slot.description && (
                              <p className="text-gray-300 text-xs mt-0.5">{slot.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
