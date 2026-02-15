'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const AUTO_REFRESH_SECONDS = 60;

/** Convierte el texto plano en bloques para mostrar: títulos vs párrafos */
function textToBlocks(raw: string): { type: 'title' | 'subtitle' | 'paragraph'; content: string }[] {
  if (!raw.trim()) return [];
  const blocks: { type: 'title' | 'subtitle' | 'paragraph'; content: string }[] = [];
  const paragraphs = raw.split(/\n\n+/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);

  for (const line of paragraphs) {
    if (!line) continue;
    const isAllCaps = line === line.toUpperCase() && /[A-Z]/.test(line) && line.length < 80;
    const isShort = line.length <= 60 && !line.includes('. ');
    if (isAllCaps && isShort) {
      blocks.push({ type: 'title', content: line });
    } else if ((isShort && line.endsWith(':')) || (line.length < 100 && !line.includes('. '))) {
      blocks.push({ type: 'subtitle', content: line });
    } else {
      blocks.push({ type: 'paragraph', content: line });
    }
  }
  return blocks;
}

export default function StreamingPage() {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoc = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/streaming-doc');
      const data = await res.json();
      if (!res.ok) {
        setError((data as { error?: string }).error || 'Error al cargar');
        return;
      }
      setText((data as { text: string }).text || '');
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoc();
  }, [fetchDoc]);

  // Actualización automática
  useEffect(() => {
    const interval = setInterval(fetchDoc, AUTO_REFRESH_SECONDS * 1000);
    return () => clearInterval(interval);
  }, [fetchDoc]);

  const refreshNow = () => {
    setLoading(true);
    fetchDoc();
  };

  const blocks = useMemo(() => textToBlocks(text), [text]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#030803] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(101,179,48,0.2),transparent_50%)] pointer-events-none" />

      <Header />

      <div className="relative flex-1 flex flex-col pt-24 pb-8 px-4">
        <div className="container mx-auto w-full max-w-4xl flex-1 flex flex-col">
          {/* Título */}
          <div className="text-center mb-6 md:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#65b330] hover:text-[#8ee04a] transition-colors mb-6 text-sm font-medium uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Inicio
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-3">
              Para streaming
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Contenido extraído del documento en Google Drive · Se actualiza solo cada {AUTO_REFRESH_SECONDS} segundos
            </p>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <button
              type="button"
              onClick={refreshNow}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#65b330] hover:bg-[#5a9e2a] disabled:opacity-60 text-white font-semibold transition-colors"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Cargando…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Actualizar ahora
                </>
              )}
            </button>
            <a
              href="https://drive.google.com/file/d/1PD2o-szuFyIMyBAqBvAW57ubGAy6O5HX/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#65b330] text-[#65b330] hover:bg-[#65b330]/10 font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver PDF en Drive
            </a>
          </div>

          {/* Contenido extraído */}
          <div className="flex-1 min-h-[50vh] rounded-2xl border-2 border-[#65b330]/50 bg-gradient-to-b from-[#0a0a0a] to-black overflow-hidden shadow-[0_0_80px_rgba(101,179,48,0.12)]">
            <div className="p-8 md:p-12 h-full overflow-y-auto max-h-[75vh]">
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 mb-6">
                  {error}
                </div>
              )}
              {loading && !text ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <div className="w-14 h-14 rounded-full border-2 border-[#65b330]/40 border-t-[#65b330] animate-spin mb-6" />
                  <p className="text-lg">Extrayendo contenido del documento…</p>
                </div>
              ) : text ? (
                <article className="space-y-8">
                  {blocks.length > 0 ? (
                    blocks.map((block, i) => (
                      <div key={i}>
                        {block.type === 'title' && (
                          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#65b330] mb-1 border-l-4 border-[#65b330] pl-4">
                            {block.content}
                          </h2>
                        )}
                        {block.type === 'subtitle' && (
                          <h3 className="text-lg md:text-xl font-bold text-white/95 mb-2">
                            {block.content}
                          </h3>
                        )}
                        {block.type === 'paragraph' && (
                          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            {block.content}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {text.split(/\n/).map((line, i) => (
                        <p key={i} className="text-gray-300 text-base md:text-lg leading-relaxed">
                          {line.trim() || '\u00A0'}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              ) : (
                <p className="text-gray-500 text-center py-12">Sin contenido para mostrar.</p>
              )}
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            El texto se obtiene del PDF en Google Drive y se actualiza automáticamente cada {AUTO_REFRESH_SECONDS} s.
          </p>
        </div>
      </div>
    </main>
  );
}
