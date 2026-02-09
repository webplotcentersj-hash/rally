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

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DAY_LABELS: Record<string, string> = {
  '2026-02-06': 'Viernes 6',
  '2026-02-07': 'Sábado 7',
  '2026-02-08': 'Domingo 8',
  '2026-02-13': 'Viernes 13',
  '2026-02-14': 'Sábado 14',
  '2026-02-15': 'Domingo 15',
};

function formatDay(dateStr: string) {
  return DAY_LABELS[dateStr] ?? dateStr;
}

function getTimeLeft(until: number): TimeLeft {
  const diff = Math.max(0, until - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownColon() {
  return (
    <span className="hidden sm:inline-flex items-center self-end pb-[0.35em] text-[#65b330] font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-90 drop-shadow-[0_0_8px_rgba(101,179,48,0.6)]">
      :
    </span>
  );
}

function CountdownDigit({ value, label }: { value: number; label: string }) {
  const str = label === 'Días' ? String(value) : String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center group">
      <div
        className="animate-countdown-glow inline-flex items-center justify-center min-w-[2.8rem] sm:min-w-[3.5rem] md:min-w-[4.5rem] lg:min-w-[5.5rem] xl:min-w-[6rem] rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#0d1f0d] to-black border-2 border-[#65b330]/70 text-[#a3ff6f] font-black tabular-nums px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl transition-transform duration-200 group-hover:scale-105"
        style={{
          textShadow: '0 0 30px rgba(163,255,111,0.5), 0 0 60px rgba(101,179,48,0.3)',
          boxShadow: 'inset 0 1px 0 rgba(163,255,111,0.15), 0 0 25px rgba(101,179,48,0.35)',
        }}
      >
        {str}
      </div>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#65b330]/90 mt-3 md:mt-4">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [phase, setPhase] = useState<Phase>('before');
  const [currentActivity, setCurrentActivity] = useState<CronogramaSlot | null>(null);
  const [nextActivity, setNextActivity] = useState<CronogramaSlot | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
        return;
      }

      if (nowTime < FIRST_EVENT_DATE) {
        setPhase('before');
        setCurrentActivity(null);
        setNextActivity(CRONOGRAMA_SLOTS[0]);
        setTimeLeft(getTimeLeft(FIRST_EVENT_DATE));
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
    <section className="py-24 md:py-36 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Fondo de contador de dias.jpeg"
          alt="Fondo"
          fill
          priority={false}
          quality={75}
          sizes="100vw"
          className="object-cover scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 z-[1] opacity-30">
        <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-[#65b330] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-[#65b330] rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-[2]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="title-section font-bold text-white mb-1 text-3xl sm:text-4xl md:text-5xl">
            Cronograma
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-6">
            Safari Tras las Sierras – Autos 13, 14 y 15 de febrero
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-12" />

          {/* Countdown números grandes (antes del evento) */}
          {isBefore && (
            <div className="mb-14">
              <p className="text-[#a3ff6f] font-bold text-lg sm:text-xl uppercase tracking-[0.3em] mb-6 md:mb-8">
                Faltan
              </p>
              <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                <CountdownDigit value={timeLeft.days} label="Días" />
                <CountdownColon />
                <CountdownDigit value={timeLeft.hours} label="Horas" />
                <CountdownColon />
                <CountdownDigit value={timeLeft.minutes} label="Min" />
                <CountdownColon />
                <CountdownDigit value={timeLeft.seconds} label="Seg" />
              </div>
            </div>
          )}

          {/* Tarjeta de actividad */}
          <div
            className={`relative rounded-2xl overflow-hidden
              backdrop-blur-xl border-2
              shadow-2xl transition-all duration-300
              ${isNow ? 'bg-[#65b330]/10 border-[#65b330]/50 shadow-[0_0_40px_rgba(101,179,48,0.2)]' : ''}
              ${isNext ? 'bg-amber-500/5 border-amber-400/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : ''}
              ${!isNow && !isNext ? 'bg-white/5 border-white/20' : ''}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
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
                </>
              )}

              {isAfter && (
                <>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                    Safari Tras las Sierras finalizado
                  </p>
                  <p className="text-[#65b330] font-semibold text-base mt-4">
                    Gracias por ser parte. Nos vemos en la próxima edición.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/cronograma"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#65b330]/60 bg-[#65b330]/20 px-6 py-3 text-[#a3ff6f] font-bold text-sm uppercase tracking-wider hover:bg-[#65b330]/30 hover:border-[#65b330] hover:shadow-[0_0_25px_rgba(101,179,48,0.3)] transition-all duration-300"
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
