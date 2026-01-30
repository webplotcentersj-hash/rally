'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const MAP_IMAGE_URL = 'http://plotcenter.com.ar/wp-content/uploads/2026/01/MAPA-WEB.jpg-scaled.jpeg';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export default function CircuitosPage() {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const lastTranslateRef = useRef({ x: 0, y: 0 });

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_ZOOM, s + ZOOM_STEP));
  }, []);
  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(MIN_ZOOM, s - ZOOM_STEP));
  }, []);
  const resetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setScale((s) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s + delta)));
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  }, [translate.x, translate.y]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setTranslate({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastTranslateRef.current = { ...translate };
      }
    },
    [translate]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartRef.current.x;
        const dy = e.touches[0].clientY - touchStartRef.current.y;
        setTranslate({
          x: lastTranslateRef.current.x + dx,
          y: lastTranslateRef.current.y + dy,
        });
      }
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    lastTranslateRef.current = { ...translate };
  }, [translate]);

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0f0a] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(101,179,48,0.12),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(101,179,48,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(101,179,48,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <Header />
      <div className="relative pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-10 animate-fade-in-up">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#7dd340] transition-all mb-6 text-sm font-medium uppercase tracking-widest"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#65b330]/20 border border-[#65b330]/40 mb-4 shadow-[0_0_40px_rgba(101,179,48,0.15)]">
                <svg className="w-8 h-8 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 title-section tracking-tight drop-shadow-lg">
                Circuitos
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-base mb-4">
                Mapa de circuitos de motos. Arrastrá para mover, usá la rueda del mouse o los botones para zoom.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-24 bg-[#65b330]" />
                <span className="w-2 h-2 rounded-full bg-[#65b330] shadow-[0_0_12px_#65b330]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#65b330]" />
              </div>
            </div>

            {/* Controles */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= MIN_ZOOM}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#65b330]/30 hover:border-[#65b330]/50 disabled:opacity-40 disabled:pointer-events-none transition-all"
                aria-label="Alejar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm text-gray-400 min-w-[4rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= MAX_ZOOM}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#65b330]/30 hover:border-[#65b330]/50 disabled:opacity-40 disabled:pointer-events-none transition-all"
                aria-label="Acercar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                type="button"
                onClick={resetView}
                className="flex items-center gap-2 px-4 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#65b330]/30 hover:border-[#65b330]/50 transition-all text-sm font-medium"
              >
                Restablecer vista
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#65b330]/30 hover:border-[#65b330]/50 transition-all"
                aria-label="Pantalla completa"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>

            {/* Contenedor del mapa con zoom/pan */}
            <div
              ref={containerRef}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl shadow-[#65b330]/10 backdrop-blur-sm"
            >
              <div
                ref={imageRef}
                className="relative w-full min-h-[320px] md:min-h-[480px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
                style={{ minHeight: 'min(70vw, 560px)', touchAction: 'none' }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="transition-transform duration-100 ease-out will-change-transform"
                  style={{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  }}
                >
                  <img
                    src={MAP_IMAGE_URL}
                    alt="Mapa de circuitos de motos - Safari Tras las Sierras"
                    className="max-w-none select-none pointer-events-none"
                    style={{ maxHeight: 'min(70vw, 560px)', width: 'auto', height: 'auto' }}
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-4">
              Imagen: Plot Center · Safari Tras las Sierras
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
