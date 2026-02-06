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
        setNextActivity(CRONOGRAMA_SLOTS[0]);
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

  const isNow = phase === 'during' && currentActivity;
  const isNext = phase === 'during_next' && nextActivity;
  const isBefore = phase === 'before';
  const isAfter = phase === 'after';

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
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="title-section font-bold text-white mb-8">
            Cronograma
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-8" />

          {/* Una sola tarjeta esmerilada */}
          <div
            className={`relative rounded-2xl border overflow-hidden
              backdrop-blur-xl bg-white/10 border-white/20
              shadow-2xl
              ${isNow ? 'shadow-[#65b330]/25 ring-1 ring-[#65b330]/40' : ''}
              ${isNext ? 'shadow-amber-400/20 ring-1 ring-amber-400/30' : ''}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative p-6 md:p-8 text-left">
              {isNow && currentActivity && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#65b330] animate-pulse" aria-hidden />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#65b330]">
                      En este momento
                    </span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                    {currentActivity.title}
                  </p>
                  {currentActivity.description && (
                    <p className="text-gray-300 text-sm md:text-base mt-2">
                      {currentActivity.description}
                    </p>
                  )}
                  <p className="text-[#65b330] font-semibold text-sm mt-4">
                    {formatDay(currentActivity.date)} · {currentActivity.start} – {currentActivity.end} hs
                  </p>
                </>
              )}

              {(isNext || isBefore) && (nextActivity || CRONOGRAMA_SLOTS[0]) && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400/90">
                      {isBefore ? 'Próxima actividad' : 'Próxima'}
                    </span>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                    {(nextActivity ?? CRONOGRAMA_SLOTS[0]).title}
                  </p>
                  {(nextActivity ?? CRONOGRAMA_SLOTS[0]).description && (
                    <p className="text-gray-300 text-sm md:text-base mt-2">
                      {(nextActivity ?? CRONOGRAMA_SLOTS[0]).description}
                    </p>
                  )}
                  <p className="text-gray-400 font-semibold text-sm mt-4">
                    {formatDay((nextActivity ?? CRONOGRAMA_SLOTS[0]).date)} · {(nextActivity ?? CRONOGRAMA_SLOTS[0]).start} – {(nextActivity ?? CRONOGRAMA_SLOTS[0]).end} hs
                  </p>
                  {isBefore && daysLeft > 0 && (
                    <p className="text-[#65b330] text-sm font-semibold mt-3">
                      El Safari comienza en {daysLeft} {daysLeft === 1 ? 'día' : 'días'}
                    </p>
                  )}
                </>
              )}

              {isAfter && (
                <>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                    Fin de semana de motos finalizado
                  </p>
                  <p className="text-[#65b330] font-semibold text-base mt-4">
                    Próximo: Autos 13, 14 y 15 de Febrero
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
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
        </div>
      </div>
    </section>
  );
}
