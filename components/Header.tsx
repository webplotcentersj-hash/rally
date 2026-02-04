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
          {/* Logo y título */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            {/* Logo de la app */}
            <img
              src="/logo.png"
              alt="Safari Tras las Sierras"
              className="h-16 md:h-20 w-auto object-contain"
            />
            
            {/* Título */}
            <div className="text-white">
              <div className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide whitespace-nowrap">
                SAFARI TRAS LAS SIERRAS
              </div>
            </div>
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
              href="#sobre"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Sobre
            </a>
            <Link
              href="/categorias"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Categorías
            </Link>
            <Link
              href="/tiempos"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Tiempos
            </Link>
            <Link
              href="/cronograma"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Cronograma
            </Link>
            <Link
              href="/circuitos"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Circuitos
            </Link>
            <a
              href="#contacto"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Contacto
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
                href="#sobre"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <Link
                href="/categorias"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link
                href="/tiempos"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Tiempos
              </Link>
              <Link
                href="/cronograma"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Cronograma
              </Link>
              <Link
                href="/circuitos"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Circuitos
              </Link>
              <a
                href="#contacto"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
            </nav>
          </div>
        )}

        <LiveModal isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} />
      </div>
    </header>
  );
}

