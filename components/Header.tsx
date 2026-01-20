'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-l border-[#65b330]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo y título */}
          <div className="flex items-center gap-4">
            {/* Logo de la app */}
            <img
              src="/logo.png"
              alt="Safari Tras las Sierras"
              className="h-12 w-auto object-contain"
            />
            
            {/* Título */}
            <div className="text-white">
              <div className="text-sm md:text-base font-bold uppercase tracking-wide">
                SAFARI TRAS LAS
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-wide">
                SIERRAS
              </div>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Inscripción
            </Link>
            <a
              href="#sobre"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Sobre
            </a>
            <a
              href="#categorias"
              className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Categorías
            </a>
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
              <Link
                href="https://safari-ashen.vercel.app/inscripcion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscripción
              </Link>
              <a
                href="#sobre"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <a
                href="#categorias"
                className="text-white hover:text-[#65b330] transition-colors text-sm font-medium uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </a>
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
      </div>
    </header>
  );
}

