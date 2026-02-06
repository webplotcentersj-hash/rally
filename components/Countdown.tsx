'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CRONOGRAMA_SLOTS,
  getCurrentActivity,
  getNextActivity,
  isAfterEvent,
  FIRST_EVENT_DATE,
  type CronogramaSlot,
} from '@/lib/cronograma-now';

type Phase = 'before' | 'during' | 'during_next' | 'after';

const DAY_LABELS: Record<string, string> = {
  '2026-02-06': 'Viernes 6',
  '2026-02-07': 'Sábado 7',
  '2026-02-08': 'Domingo 8',
};

function formatDay(dateStr: string) {
  return DAY_LABELS[dateStr] ?? dateStr;
}

export default function Countdown() {
  const [phase, setPhase] = useState<Phase>('before');
  const [currentActivity, setCurrentActivity] = useState<CronogramaSlot | null>(null);
  const [nextActivity, setNextActivity] = useState<CronogramaSlot | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const now = new Date();
      const nowTime = now.getTime();

      const activity = getCurrentActivity(now);
      if (activity) {
        setPhase('during');
        setCurrentActivity(activity);
        setNextActivity(null);
        setDaysLeft(0);
        return;
      }

      if (nowTime < FIRST_EVENT_DATE) {
        setPhase('before');
        setCurrentActivity(null);
        setNextActivity(null);
        setDaysLeft(Math.floor((FIRST_EVENT_DATE - nowTime) / (1000 * 60 * 60 * 24)));
        return;
      }

      if (isAfterEvent(now)) {
        setPhase('after');
        setCurrentActivity(null);
        setNextActivity(null);
        return;
      }

      setPhase('during_next');
      setCurrentActivity(null);
      setNextActivity(getNextActivity(now));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const isSlotNow = (slot: CronogramaSlot) =>
    phase === 'during' && currentActivity?.date === slot.date && currentActivity?.start === slot.start;
  const isSlotNext = (slot: CronogramaSlot) =>
    phase === 'during_next' && nextActivity?.date === slot.date && nextActivity?.start === slot.start;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Fondo de contador de dias.jpeg"
          alt="Fondo"
          fill
          priority={false}
          quality={75}
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-gray-900/40 via-gray-800/30 to-gray-900/40" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#65b330] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#65b330] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-[2]">
        <div className="max-w-4xl mx-auto">
          {/* Título y estado actual */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="title-section font-bold text-white mb-2">
              Cronograma – Motos 6, 7 y 8 de Febrero
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-4" />

            {phase === 'during' && currentActivity && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#65b330] text-black text-sm font-bold uppercase tracking-wide mb-4">
                <span className="flex h-2 w-2 rounded-full bg-black animate-pulse" aria-hidden />
                En este momento: {currentActivity.title}
              </div>
            )}
            {phase === 'during_next' && nextActivity && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wide border border-white/30 mb-4">
                Próxima: {nextActivity.title} a las {nextActivity.start} hs
              </div>
            )}
            {phase === 'before' && daysLeft > 0 && (
              <p className="text-[#65b330] font-semibold text-lg">
                El Safari comienza en {daysLeft} {daysLeft === 1 ? 'día' : 'días'}
              </p>
            )}
            {phase === 'after' && (
              <p className="text-[#65b330] font-semibold text-lg">
                Fin de semana de motos finalizado · Próximo: Autos 13, 14, 15 de Febrero
              </p>
            )}
          </div>

          {/* Lista de actividades del cronograma */}
          <div className="space-y-4">
            {CRONOGRAMA_SLOTS.map((slot) => {
              const now = isSlotNow(slot);
              const next = isSlotNext(slot);
              return (
                <div
                  key={`${slot.date}-${slot.start}-${slot.title}`}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${
                    now
                      ? 'border-[#65b330] bg-[#65b330]/20 shadow-lg shadow-[#65b330]/20'
                      : next
                        ? 'border-amber-400/50 bg-amber-500/10'
                        : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 gap-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#65b330]">
                      {formatDay(slot.date)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {slot.start} – {slot.end} hs
                    </span>
                    {now && (
                      <span className="ml-auto text-xs font-bold uppercase text-[#65b330]">
                        Ahora
                      </span>
                    )}
                    {next && (
                      <span className="ml-auto text-xs font-bold uppercase text-amber-400">
                        Próxima
                      </span>
                    )}
                  </div>
                  <p className="text-white font-semibold mt-1">
                    {slot.title}
                  </p>
                  {slot.description && (
                    <p className="text-gray-400 text-sm mt-0.5">
                      {slot.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/cronograma"
              className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#7dd340] font-semibold text-sm uppercase tracking-wide transition-colors"
            >
              Ver cronograma completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {(phase === 'before' || phase === 'after') && (
            <div className="mt-8 text-center space-y-1 text-gray-400 text-sm">
              <p>Motos: 6, 7, 8 de Febrero</p>
              <p>Autos: 13, 14, 15 de Febrero</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
