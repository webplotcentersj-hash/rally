'use client';

import { useState } from 'react';
import Link from 'next/link';
import LiveModal from './LiveModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-l border-[#65b330]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logos - 3 del mismo tamaño, un poco más chicos */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Safari Tras las Sierras"
              className="h-9 md:h-11 w-auto object-contain"
            />
            <img
              src="http://plotcenter.com.ar/wp-content/uploads/2026/02/Recurso-15.png"
              alt=""
              className="h-9 md:h-11 w-auto object-contain"
            />
            <img
              src="http://plotcenter.com.ar/wp-content/uploads/2026/02/insumos-para-figma-12.png"
              alt=""
              className="h-9 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setIsLiveModalOpen(true)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium uppercase tracking-wide"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden />
              Ver Safari en vivo
            </button>
            {/* Enlaces ordenados alfabéticamente (sin Contacto) */}
            <Link
              href="/categorias"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Categorías
            </Link>
            <Link
              href="/circuitos"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Circuitos
            </Link>
            <Link
              href="/cronograma"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Cronograma
            </Link>
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Inscripción
            </Link>
            <Link
              href="https://safari-ashen.vercel.app/pilotos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Pilotos inscriptos
            </Link>
            <Link
              href="/reglamento"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Reglamento
            </Link>
            <a
              href="https://safari-ashen.vercel.app/tiempos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Tiempos
            </a>
            <a
              href="https://safari-ashen.vercel.app/prensa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-amber-400 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 hover:border-amber-500/60 transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
              Prensa
            </a>
          </nav>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4 pt-4">
              <button
                onClick={() => { setIsLiveModalOpen(true); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium uppercase tracking-wide text-left"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden />
                Ver Safari en vivo
              </button>
              <Link
                href="/categorias"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link
                href="/reglamento"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Reglamento
              </Link>
              <a
                href="https://safari-ashen.vercel.app/tiempos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Tiempos
              </a>
              <Link
                href="/circuitos"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Circuitos
              </Link>
              <Link
                href="/cronograma"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Cronograma
              </Link>
              <Link
                href="https://safari-ashen.vercel.app/inscripcion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscripción
              </Link>
              <Link
                href="https://safari-ashen.vercel.app/pilotos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Pilotos inscriptos
              </Link>
              <a
                href="https://safari-ashen.vercel.app/prensa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md text-amber-400 bg-amber-500/15 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                Prensa
              </a>
            </nav>
          </div>
        )}

        <LiveModal isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} />
      </div>
    </header>
  );
}

