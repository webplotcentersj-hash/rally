'use client';

import { useState } from 'react';
import Link from 'next/link';

const CIRCUITOS_SUB = [
  { label: 'Categorías', href: '/categorias' },
  { label: 'Cronograma', href: '/cronograma' },
  { label: 'Clasificación de motos', href: '/#clasificacion-motos' },
  { label: 'Reglamentos', href: '/reglamento' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circuitosOpen, setCircuitosOpen] = useState(false);
  const [circuitosMobileOpen, setCircuitosMobileOpen] = useState(false);

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
            <div
              className="relative"
              onMouseEnter={() => setCircuitosOpen(true)}
              onMouseLeave={() => setCircuitosOpen(false)}
            >
              <Link
                href="/circuitos"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide inline-flex items-center gap-1"
              >
                Circuitos
                <svg className={`w-4 h-4 transition-transform ${circuitosOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {circuitosOpen && (
                <div className="absolute top-full left-0 mt-1 py-2 min-w-[220px] bg-black border border-[#65b330] rounded-md shadow-xl">
                  {CIRCUITOS_SUB.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm font-medium uppercase tracking-wide text-white hover:bg-[#65b330]/20 hover:text-[#65b330] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
            <a
              href="https://safari-ashen.vercel.app/tiempos"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1.5 text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
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
              <div>
                <button
                  type="button"
                  onClick={() => setCircuitosMobileOpen(!circuitosMobileOpen)}
                  className="flex items-center justify-between w-full text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                >
                  Circuitos
                  <svg className={`w-4 h-4 transition-transform ${circuitosMobileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {circuitosMobileOpen && (
                  <div className="flex flex-col gap-2 pl-3 mt-2 border-l border-gray-700">
                    {CIRCUITOS_SUB.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-gray-300 hover:text-[#65b330] text-sm uppercase tracking-wide"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <a
                href="https://safari-ashen.vercel.app/tiempos"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Tiempos
              </a>
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
      </div>
    </header>
  );
}

