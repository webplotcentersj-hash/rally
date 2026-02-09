'use client';

import { useState, useEffect } from 'react';

const VALLE_FERTIL_LAT = -30.64;
const VALLE_FERTIL_LON = -67.41;
const API_URL = 'https://api.open-meteo.com/v1/forecast';

type WeatherData = {
  current: {
    temperature_2m: number;
    weather_code: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

function weatherLabel(code: number): string {
  if (code === 0) return 'Despejado';
  if (code >= 1 && code <= 3) return 'Parcialmente nublado';
  if (code === 45 || code === 48) return 'Niebla';
  if (code >= 51 && code <= 55) return 'Llovizna';
  if (code >= 61 && code <= 67) return 'Lluvia';
  if (code >= 71 && code <= 77) return 'Nieve';
  if (code >= 80 && code <= 82) return 'Lluvias';
  if (code >= 85 && code <= 86) return 'Nieve';
  if (code === 95) return 'Tormenta';
  if (code >= 96 && code <= 99) return 'Tormenta fuerte';
  return 'Variable';
}

function WeatherIcon({ code, className = 'w-8 h-8' }: { code: number; className?: string }) {
  const sun = (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
  const cloud = (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
  const cloudSun = (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2z" />
    </svg>
  );
  const rain = (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.5a2 2 0 01-2 2h-2a2 2 0 01-2-2V5L8 4z" />
    </svg>
  );
  const storm = (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
  const fog = (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
  if (code === 0) return sun;
  if (code >= 1 && code <= 3) return cloudSun;
  if (code >= 45 && code <= 48) return fog;
  if (code >= 51 && code <= 67) return rain;
  if (code >= 80 && code <= 82) return rain;
  if (code >= 95 && code <= 99) return storm;
  return cloud;
}

function formatDayName(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dateStr === today.toISOString().slice(0, 10)) return 'Hoy';
  if (dateStr === tomorrow.toISOString().slice(0, 10)) return 'Mañana';
  return d.toLocaleDateString('es-AR', { weekday: 'short' });
}

export default function WeatherValleFertil() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      latitude: String(VALLE_FERTIL_LAT),
      longitude: String(VALLE_FERTIL_LON),
      current: 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'America/Argentina/Buenos_Aires',
      forecast_days: '7',
    });
    fetch(`${API_URL}?${params}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.reason || 'Error al cargar clima');
        setData(json);
      })
      .catch((err) => setError(err.message || 'Error de conexión'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#65b330]/20 border border-[#65b330]/40 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">Clima en Valle Fértil</h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 h-48 flex items-center justify-center">
              <p className="text-gray-400">Cargando pronóstico...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Clima en Valle Fértil</h2>
            <p className="text-gray-400">No se pudo cargar el pronóstico. Intentá más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  const { current, daily } = data;

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-black border-t border-[#65b330]/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(101,179,48,0.08),transparent)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-[1]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#65b330]/20 border border-[#65b330]/40 text-[#65b330]">
              <WeatherIcon code={current.weather_code} className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Clima en Valle Fértil
              </h2>
              <p className="text-gray-400 text-sm">Pronóstico actual y extendido · San Juan</p>
            </div>
          </div>

          {/* Actual */}
          <div className="rounded-2xl border-2 border-[#65b330]/40 bg-gradient-to-br from-[#65b330]/10 to-black/80 p-6 md:p-8 mb-6 shadow-[0_0_30px_rgba(101,179,48,0.1)]">
            <p className="text-[#65b330] text-xs font-bold uppercase tracking-widest mb-3">Ahora</p>
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              <div className="flex items-center gap-4">
                <div className="text-[#a3ff6f]">
                  <WeatherIcon code={current.weather_code} className="w-14 h-14 md:w-16 md:h-16" />
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-black text-white tabular-nums">
                    {Math.round(current.temperature_2m)}°
                  </p>
                  <p className="text-gray-300 font-medium">
                    {weatherLabel(current.weather_code)}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 md:gap-8 text-sm">
                {current.relative_humidity_2m != null && (
                  <div>
                    <p className="text-gray-500 uppercase tracking-wide">Humedad</p>
                    <p className="text-white font-semibold">{current.relative_humidity_2m}%</p>
                  </div>
                )}
                {current.wind_speed_10m != null && (
                  <div>
                    <p className="text-gray-500 uppercase tracking-wide">Viento</p>
                    <p className="text-white font-semibold">{Math.round(current.wind_speed_10m)} km/h</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Extendido */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <p className="text-[#65b330]/90 text-xs font-bold uppercase tracking-widest px-6 pt-5 pb-2">
              Próximos 7 días
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-px bg-white/10">
              {daily.time.slice(0, 7).map((dateStr, i) => (
                <div
                  key={dateStr}
                  className="bg-black/60 p-4 flex flex-col items-center text-center min-h-[120px]"
                >
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">
                    {formatDayName(dateStr)}
                  </p>
                  <div className="text-[#65b330] mb-2">
                    <WeatherIcon code={daily.weather_code[i]} className="w-8 h-8 mx-auto" />
                  </div>
                  <p className="text-[#a3ff6f] font-bold text-lg tabular-nums">
                    {Math.round(daily.temperature_2m_max[i])}°
                  </p>
                  <p className="text-gray-500 text-sm tabular-nums">
                    {Math.round(daily.temperature_2m_min[i])}°
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-500 text-xs text-center mt-4">
            Datos por{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#65b330]/80 hover:text-[#65b330] underline"
            >
              Open-Meteo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
