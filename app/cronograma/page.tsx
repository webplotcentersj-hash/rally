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

export default function CronogramaPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
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
                Safari Tras las Sierras – Autos. Reunión obligatoria, largada simbólica, primes y podio. Valle Fértil.
              </p>

              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-24 bg-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#65b330]" />
              </div>
            </div>

            {/* Reunión obligatoria */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Reunión obligatoria
              </h2>
              <article className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-black/40 to-[#101910]/90 shadow-xl shadow-black/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_45%)]" />
                <div className="relative p-6 md:p-7 space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-black/40 border border-amber-500/30 text-amber-200">
                    {reunionBlock.label}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white">{reunionBlock.subtitle}</h3>
                  <p className="text-amber-200/90 text-sm">
                    Atención: el día Viernes 13/02, 18:00 hs en el Salón Cultural Municipal habrá una charla obligatoria
                    de José María Andruccetti de la AAV (Asociación Argentina de Volantes) para Pilotos o Copilotos.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-200">
                    {reunionBlock.slots.map((slot) => (
                      <li key={slot.time} className="flex items-start gap-3">
                        <span className="font-mono text-xs md:text-sm text-[#a3ff6f] bg-black/50 border border-[#65b330]/40 rounded-md px-2 py-1">
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
                  <p className="text-amber-300 font-semibold uppercase tracking-wide text-sm mt-2">
                    Asistencia obligatoria para pilotos o copilotos.
                  </p>
                </div>
              </article>
            </section>

            {/* Posición de largada */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                Posición de largada
              </h2>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 text-gray-200 text-sm md:text-base leading-relaxed space-y-2">
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

            {/* Largada */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                Largada
              </h2>
              <div className="rounded-2xl border border-[#65b330]/40 bg-[#65b330]/10 p-6 md:p-7">
                <p className="text-white font-semibold">
                  Auto 0: Juan Pablo Batista + Auto Policía (Jefe Operativo).
                </p>
              </div>
            </section>

            {/* Viernes 13/02 – Largada simbólica */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Viernes 13/02
              </h2>
              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl shadow-black/40">
                <div className="relative p-6 md:p-7 space-y-3">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#a3ff6f] bg-black/60 border border-[#65b330]/50 rounded-full px-3 py-1">
                    {viernesBlock.label}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{viernesBlock.subtitle}</h3>
                  <ul className="space-y-2">
                    {viernesBlock.slots.map((slot) => (
                      <li key={slot.time} className="flex items-start gap-3">
                        <span className="font-mono text-sm text-[#a3ff6f] bg-black/50 border border-[#65b330]/40 rounded-md px-2 py-1">
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

            {/* Sábado */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Sábado 14/02
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sabadoBlocks.map((block) => (
                  <article
                    key={block.subtitle}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl shadow-black/40"
                  >
                    <div className="relative p-6 space-y-3">
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#a3ff6f] bg-black/60 border border-[#65b330]/50 rounded-full px-3 py-1">
                        {block.label}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-white">{block.subtitle}</h3>
                      <ul className="space-y-2 text-sm text-gray-100">
                        {block.slots.map((slot) => (
                          <li key={slot.time} className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                            <p className="font-mono text-xs text-[#a3ff6f] mb-0.5">{slot.time}</p>
                            <p className="font-semibold text-white">{slot.title}</p>
                            {slot.description && (
                              <p className="text-xs text-gray-300 mt-0.5">{slot.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Domingo */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Domingo 15/02
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {domingoBlocks.map((block) => (
                  <article
                    key={block.subtitle}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl shadow-black/40"
                  >
                    <div className="relative p-6 space-y-3">
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#a3ff6f] bg-black/60 border border-[#65b330]/50 rounded-full px-3 py-1">
                        {block.label}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-white">{block.subtitle}</h3>
                      <ul className="space-y-2 text-sm text-gray-100">
                        {block.slots.map((slot) => (
                          <li key={slot.time + (slot.title || '')} className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                            <p className="font-mono text-xs text-[#a3ff6f] mb-0.5">{slot.time}</p>
                            <p className="font-semibold text-white">{slot.title}</p>
                            {slot.description && (
                              <p className="text-xs text-gray-300 mt-0.5">{slot.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Aceptación del Reglamento */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                Aceptación del Reglamento
              </h2>
              <div className="rounded-2xl border border-white/10 bg-black/70 px-5 py-5 md:px-6 md:py-6 text-sm md:text-base text-gray-300 leading-relaxed space-y-3">
                <p>
                  La inscripción y participación en la competencia implica el conocimiento, aceptación y cumplimiento
                  total del presente Reglamento Particular de la Prueba y de toda normativa aplicable.
                </p>
                <p>
                  El RPP puede tener modificaciones si así lo cree necesario el Comisario Deportivo.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
