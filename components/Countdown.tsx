'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Fecha objetivo: 6 de febrero (inicio de motos)
    const targetDate = new Date('2026-02-06T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

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
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#65b330] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#65b330] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Título */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              El Safari Comienza En
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto" />
          </div>

          {/* Contador */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {timeUnits.map((unit, index) => (
              <div
                key={unit.label}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:border-[#65b330] transition-all duration-300 hover:shadow-2xl hover:shadow-[#65b330]/20 hover:-translate-y-2">
                  <div className="text-4xl md:text-6xl font-bold text-[#65b330] mb-2 tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider font-semibold">
                    {unit.label}
                  </div>
                </div>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#65b330]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-12 md:mt-16">
            <p className="text-gray-400 text-lg md:text-xl mb-4">
              🏍️ Motos: 6, 7, 8 de Febrero
            </p>
            <p className="text-gray-400 text-lg md:text-xl">
              🚗 Autos: 13, 14, 15 de Febrero
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

