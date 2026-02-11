'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'safari-role';
type Role = 'piloto' | 'espectador' | null;

const LINKS_PILOTO = [
  { href: 'https://safari-ashen.vercel.app/inscripcion', label: 'Inscripción', external: true, icon: '📋' },
  { href: '/categorias', label: 'Categorías', external: false, icon: '🏁' },
  { href: '/#clasificacion-motos', label: 'Clasificación Motos', external: false, icon: '🏆' },
  { href: 'https://safari-ashen.vercel.app/tiempos', label: 'Tiempos', external: true, icon: '⏱️' },
  { href: '/reglamento', label: 'Reglamento', external: false, icon: '📄' },
];

const LINKS_ESPECTADOR = [
  { href: '/cronograma', label: 'Cronograma', external: false, icon: '📅' },
  { href: '/#faq', label: 'Mapa y preguntas frecuentes', external: false, icon: '📍' },
  { href: '/#galeria', label: 'Galería', external: false, icon: '📷' },
  { href: '/#noticias', label: 'Noticias', external: false, icon: '📰' },
];

function getStoredRole(): Role {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === 'piloto' || v === 'espectador') return v;
  return null;
}

export default function ModoVisita() {
  const [role, setRole] = useState<Role>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(getStoredRole());
    setMounted(true);
  }, []);

  const choose = (r: 'piloto' | 'espectador') => {
    localStorage.setItem(STORAGE_KEY, r);
    setRole(r);
  };

  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRole(null);
  };

  if (!mounted) return null;

  return (
    <section className="bg-black py-12 md:py-16 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {role === null ? (
            <>
              <p className="text-center text-gray-400 text-sm uppercase tracking-wider mb-6">
                ¿Cómo vas a vivir el Safari?
              </p>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <button
                  type="button"
                  onClick={() => choose('piloto')}
                  className="group relative overflow-hidden rounded-2xl border-2 border-[#65b330]/50 bg-white/5 p-8 text-left transition-all duration-300 hover:border-[#65b330] hover:bg-[#65b330]/10 hover:scale-[1.02]"
                >
                  <span className="text-4xl mb-4 block">🏍️</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Soy piloto</h3>
                  <p className="text-gray-400 text-sm">
                    Inscripción, categorías, clasificación y tiempos.
                  </p>
                  <span className="absolute bottom-4 right-4 text-[#65b330] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => choose('espectador')}
                  className="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-white/5 p-8 text-left transition-all duration-300 hover:border-[#65b330] hover:bg-[#65b330]/10 hover:scale-[1.02]"
                >
                  <span className="text-4xl mb-4 block">👀</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Soy espectador</h3>
                  <p className="text-gray-400 text-sm">
                    Cronograma, cómo llegar y qué ver.
                  </p>
                  <span className="absolute bottom-4 right-4 text-[#65b330] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <p className="text-[#65b330] font-semibold uppercase tracking-wide text-sm">
                  Para vos {role === 'piloto' ? '— piloto' : '— espectador'}
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-gray-500 hover:text-[#65b330] text-sm transition-colors"
                >
                  Cambiar
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {(role === 'piloto' ? LINKS_PILOTO : LINKS_ESPECTADOR).map((link) => (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-[#65b330]/20 hover:border-[#65b330]/50 transition-all"
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-[#65b330]/20 hover:border-[#65b330]/50 transition-all"
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
