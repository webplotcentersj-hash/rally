'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const AUTO_REFRESH_SECONDS = 60;

type Block =
  | { type: 'title'; content: string }
  | { type: 'subtitle'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

function isTableLine(line: string): boolean {
  return line.trim().startsWith('|') && line.trim().endsWith('|') && line.includes('|');
}

function parseMarkdownTable(tableText: string): { headers: string[]; rows: string[][] } | null {
  const lines = tableText.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;
  const parseRow = (row: string) =>
    row
      .split('|')
      .map((c) => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1);
  const headerRow = parseRow(lines[0]);
  const sep = lines[1];
  if (!/^[\s|\-]+$/.test(sep)) return null;
  const headers = headerRow;
  const rows: string[][] = [];
  for (let i = 2; i < lines.length; i++) {
    rows.push(parseRow(lines[i]));
  }
  return { headers, rows };
}

/** Convierte el texto en bloques: títulos, párrafos y tablas (markdown) */
function textToBlocks(raw: string): Block[] {
  if (!raw.trim()) return [];
  const blocks: Block[] = [];
  const lines = raw.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i++;
      continue;
    }

    if (isTableLine(trimmed)) {
      const tableLines: string[] = [];
      while (i < lines.length && isTableLine(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const table = parseMarkdownTable(tableLines.join('\n'));
      if (table && table.headers.length > 0) {
        blocks.push({ type: 'table', headers: table.headers, rows: table.rows });
      }
      continue;
    }

    const isAllCaps = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed) && trimmed.length < 100;
    const isShort = trimmed.length <= 70 && !trimmed.includes('. ');
    if (isAllCaps && isShort) {
      blocks.push({ type: 'title', content: trimmed });
      i++;
    } else if ((isShort && trimmed.endsWith(':')) || (trimmed.length < 120 && !trimmed.includes('. '))) {
      blocks.push({ type: 'subtitle', content: trimmed });
      i++;
    } else {
      const para: string[] = [trimmed];
      i++;
      while (i < lines.length && lines[i].trim() && !isTableLine(lines[i].trim())) {
        para.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: 'paragraph', content: para.join(' ') });
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
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(101,179,48,0.15),transparent_50%)] pointer-events-none" />

      <Header />

      <div className="relative flex-1 flex flex-col pt-20 pb-10 px-4 md:px-8">
        <div className="container mx-auto w-full max-w-6xl flex-1 flex flex-col">
          {/* Cabecera: logo Plot Center + EN VIVO */}
          <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
            <Link href="https://www.plotcenter.com.ar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-[#65b330] rounded-lg">
              <img
                src="http://plotcenter.com.ar/wp-content/uploads/2026/01/Logo-Blanco-COMPLETO.png"
                alt="Plot Center"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain"
              />
            </Link>
            <div className="inline-flex items-center gap-2.5 mt-4 px-4 py-2 rounded-full border-2 border-red-500/60 bg-red-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <span className="text-red-400 font-black text-base md:text-lg uppercase tracking-[0.2em]">
                En vivo
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
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

          {/* Contenido para TV: tipografía grande y tablas claras */}
          <div className="flex-1 min-h-[50vh] rounded-2xl border-2 border-[#65b330]/50 bg-black/80 overflow-hidden shadow-[0_0_80px_rgba(101,179,48,0.15)] relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" aria-hidden />
            <div className="p-6 md:p-10 lg:p-12 h-full overflow-y-auto max-h-[70vh]">
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 px-5 py-4 mb-6 text-lg">
                  {error}
                </div>
              )}
              {loading && !text ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <div className="w-16 h-16 rounded-full border-2 border-[#65b330]/40 border-t-[#65b330] animate-spin mb-6" />
                  <p className="text-xl">Extrayendo contenido del documento…</p>
                </div>
              ) : text ? (
                <article className="space-y-8 md:space-y-10">
                  {blocks.length > 0 ? (
                    blocks.map((block, i) => (
                      <div key={i}>
                        {block.type === 'title' && (
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#65b330] mb-2 border-l-4 border-[#65b330] pl-5">
                            {block.content}
                          </h2>
                        )}
                        {block.type === 'subtitle' && (
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {block.content}
                          </h3>
                        )}
                        {block.type === 'paragraph' && (
                          <p className="text-gray-200 text-lg md:text-xl lg:text-2xl leading-relaxed">
                            {block.content}
                          </p>
                        )}
                        {block.type === 'table' && (
                          <div className="overflow-x-auto rounded-xl border border-[#65b330]/40 bg-[#0a0a0a]/80 my-4">
                            <table className="w-full min-w-[400px] text-left border-collapse">
                              <thead>
                                <tr className="border-b-2 border-[#65b330]">
                                  {block.headers.map((h, j) => (
                                    <th
                                      key={j}
                                      className="py-4 px-4 md:py-5 md:px-6 text-[#65b330] font-bold uppercase tracking-wide text-base md:text-lg lg:text-xl"
                                    >
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {block.rows.map((row, ri) => (
                                  <tr
                                    key={ri}
                                    className={`border-b border-white/10 ${ri % 2 === 0 ? 'bg-white/[0.03]' : ''}`}
                                  >
                                    {block.headers.map((_, j) => (
                                      <td
                                        key={j}
                                        className="py-3 px-4 md:py-4 md:px-6 text-white text-base md:text-lg lg:text-xl"
                                      >
                                        {row[j] ?? '—'}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {text.split(/\n/).map((line, i) => (
                        <p key={i} className="text-gray-200 text-lg md:text-xl leading-relaxed">
                          {line.trim() || '\u00A0'}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              ) : (
                <p className="text-gray-500 text-center py-12 text-xl">Sin contenido para mostrar.</p>
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
