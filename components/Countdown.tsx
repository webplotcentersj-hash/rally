'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getCurrentActivity,
  getNextActivity,
  isAfterEvent,
  FIRST_EVENT_DATE,
  type CronogramaSlot,
} from '@/lib/cronograma-now';

type Phase = 'before' | 'during' | 'during_next' | 'after';

export default function Countdown() {
  const [phase, setPhase] = useState<Phase>('before');
  const [currentActivity, setCurrentActivity] = useState<CronogramaSlot | null>(null);
  const [nextActivity, setNextActivity] = useState<CronogramaSlot | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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
        setNextActivity(null);
        const diff = FIRST_EVENT_DATE - nowTime;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
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

  const timeUnits = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

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
        <div className="max-w-5xl mx-auto text-center">
          {/* Durante el evento: actividad actual */}
          {phase === 'during' && currentActivity && (
            <>
              <div className="mb-8 md:mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#65b330] text-black mb-4">
                  En este momento
                </span>
                <h2 className="title-section font-bold text-white mb-2">
                  {currentActivity.title}
                </h2>
                {currentActivity.description && (
                  <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                    {currentActivity.description}
                  </p>
                )}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mt-4" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4">
                <span className="flex h-2 w-2 rounded-full bg-[#65b330] animate-pulse" aria-hidden />
                <span className="text-white font-medium">
                  {currentActivity.date.slice(8, 10)}/{currentActivity.date.slice(5, 7)} · {currentActivity.start} – {currentActivity.end} hs
                </span>
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
            </>
          )}

          {/* Antes del evento: countdown */}
          {phase === 'before' && (
            <>
              <div className="mb-12 md:mb-16">
                <h2 className="title-section font-bold text-white mb-4">
                  El Safari Comienza En
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {timeUnits.map((unit, index) => (
                  <div key={unit.label} className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:border-[#65b330] transition-all duration-300 hover:shadow-2xl hover:shadow-[#65b330]/20 hover:-translate-y-2">
                      <div className="text-4xl md:text-6xl font-bold text-[#65b330] mb-2 tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider font-semibold">
                        {unit.label}
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#65b330]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
              <div className="mt-12 md:mt-16 space-y-5">
                <p className="text-white text-lg md:text-xl font-bold tracking-wide drop-shadow-md">
                  Motos: 6, 7, 8 de Febrero
                </p>
                <p className="text-white text-lg md:text-xl font-bold tracking-wide drop-shadow-md">
                  Autos: 13, 14, 15 de Febrero
                </p>
              </div>
            </>
          )}

          {/* Durante el evento pero entre horarios: próxima actividad */}
          {phase === 'during_next' && nextActivity && (
            <>
              <div className="mb-8 md:mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 mb-4">
                  Próxima actividad
                </span>
                <h2 className="title-section font-bold text-white mb-2">
                  {nextActivity.title}
                </h2>
                {nextActivity.description && (
                  <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                    {nextActivity.description}
                  </p>
                )}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mt-4" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4">
                <span className="text-white font-medium">
                  {nextActivity.date.slice(8, 10)}/{nextActivity.date.slice(5, 7)} · A las {nextActivity.start} hs
                </span>
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
            </>
          )}

          {/* Después del evento motos */}
          {phase === 'after' && (
            <>
              <div className="mb-8">
                <h2 className="title-section font-bold text-white mb-4">
                  Safari Tras las Sierras – Motos
                </h2>
                <p className="text-xl md:text-2xl text-[#65b330] font-semibold mb-2">
                  El fin de semana de motos finalizó
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-8" />
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-5 inline-block">
                <p className="text-white text-lg md:text-xl font-bold tracking-wide">
                  Próximo: Autos 13, 14, 15 de Febrero
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/cronograma"
                  className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#7dd340] font-semibold text-sm uppercase tracking-wide transition-colors"
                >
                  Ver cronograma
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
