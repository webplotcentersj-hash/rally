'use client';

import { useState, useEffect } from 'react';

// San Agustín del Valle Fértil, cabecera del departamento Valle Fértil, San Juan
const VALLE_FERTIL_LAT = -30.6667;
const VALLE_FERTIL_LON = -67.4333;
const API_URL = 'https://api.open-meteo.com/v1/forecast';

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature?: number;
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
  const c = className;
  // Sol despejado
  const sun = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
  // Sol y nube (parcialmente nublado)
  const partlyCloudy = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="9" r="2.5" />
      <path d="M8 3v1.5M8 14.5v1M4.5 9H3M13 9h-1.5M5.8 5.8L4.7 7M11.3 11l-1.1 1.2M5.8 12.2L4.7 11M11.3 7l-1.1-1.2" />
      <path d="M18 12a4 4 0 0 0-7.2-2.4 3.5 3.5 0 0 0 1.2 6.9H18a3 3 0 0 0 0-4.5z" />
    </svg>
  );
  // Nube
  const cloud = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
  // Nube con lluvia
  const rain = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <path d="M8 14v4M12 14v4M16 14v4M10 18v2M14 18v2" />
    </svg>
  );
  // Tormenta
  const storm = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <path d="M13 12l-3 5h4l-3 5" strokeWidth={2} />
    </svg>
  );
  // Niebla
  const fog = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h16M4 18h12M6 10h12M4 6h10" />
    </svg>
  );
  // Nieve
  const snow = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <path d="M12 13v3M12 17v1M10 15h4M12 14l-1.5 2.6M12 14l1.5 2.6" />
    </svg>
  );
  // Llovizna
  const drizzle = (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <path d="M8 15h.01M12 15h.01M16 15h.01" />
    </svg>
  );

  if (code === 0) return sun;
  if (code >= 1 && code <= 3) return partlyCloudy;
  if (code === 45 || code === 48) return fog;
  if (code >= 51 && code <= 55) return drizzle;
  if (code >= 61 && code <= 67) return rain;
  if (code >= 71 && code <= 77) return snow;
  if (code >= 80 && code <= 82) return rain;
  if (code >= 85 && code <= 86) return snow;
  if (code >= 95 && code <= 99) return storm;
  return cloud;
}

export default function WeatherValleFertil() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      latitude: String(VALLE_FERTIL_LAT),
      longitude: String(VALLE_FERTIL_LON),
      current: 'temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'America/Argentina/Buenos_Aires',
      forecast_days: '1',
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
              <p className="text-gray-400 text-sm">San Agustín del Valle Fértil · Hoy</p>
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
                  {current.apparent_temperature != null && Math.round(current.apparent_temperature) !== Math.round(current.temperature_2m) && (
                    <p className="text-gray-400 text-sm mt-0.5">
                      Sensación {Math.round(current.apparent_temperature)}°
                    </p>
                  )}
                  <p className="text-gray-300 font-medium mt-1">
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

          {daily.time.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden mb-6">
              <p className="text-[#65b330]/90 text-xs font-bold uppercase tracking-widest px-6 pt-5 pb-2">
                Hoy
              </p>
              <div className="bg-black/60 p-4 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <WeatherIcon code={daily.weather_code[0]} className="w-10 h-10 text-[#65b330]" />
                  <div className="text-left">
                    <p className="text-gray-400 text-xs font-semibold uppercase">Máx</p>
                    <p className="text-[#a3ff6f] font-bold text-xl tabular-nums">{Math.round(daily.temperature_2m_max[0])}°</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-xs font-semibold uppercase">Mín</p>
                  <p className="text-white font-bold text-xl tabular-nums">{Math.round(daily.temperature_2m_min[0])}°</p>
                </div>
              </div>
            </div>
          )}

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
