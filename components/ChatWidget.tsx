'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const PLACEHOLDER = 'Preguntá sobre el Safari, fechas, inscripción, cronograma...';

/** Limpia el texto de la respuesta: quita asteriscos y convierte saltos de línea en <br /> para mostrar bien. */
function cleanResponseText(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/\*/g, '');
  return escaped.replace(/\n/g, '<br />');
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setError(null);
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: (data as { error?: string }).error || 'Error al responder.' }]);
        return;
      }
      const reply = (data as { message?: string }).message ?? 'No pude responder.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setError('Error de conexión.');
      setMessages((prev) => [...prev, { role: 'assistant', content: 'No pude conectar. Intentá más tarde.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#65b330] text-white shadow-lg shadow-[#65b330]/40 hover:bg-[#5a9e2a] hover:scale-105 hover:shadow-xl hover:shadow-[#65b330]/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#65b330] focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-36 right-6 z-50 w-[calc(100vw-3rem)] max-w-md rounded-2xl border border-[#65b330]/30 bg-gray-900/95 backdrop-blur-md shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-gradient-to-r from-[#65b330]/20 to-transparent">
            <div className="w-10 h-10 rounded-xl bg-[#65b330]/25 flex items-center justify-center ring-1 ring-[#65b330]/40">
              <svg className="w-5 h-5 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-white block">Asistente Safari</span>
              <span className="text-xs text-gray-500">Preguntá lo que necesites</span>
            </div>
          </div>

          {/* Mensajes */}
          <div
            ref={listRef}
            className="flex-1 min-h-[240px] max-h-[50vh] overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm mb-1">Escribí tu pregunta sobre el Safari.</p>
                <p className="text-gray-500 text-xs">Fechas, inscripción, cronograma, circuitos, pilotos.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[#65b330]/20 flex items-center justify-center mt-1" aria-hidden>
                    <svg className="w-4 h-4 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#65b330] text-white shadow-lg shadow-[#65b330]/25 rounded-br-md'
                      : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-md'
                  }`}
                >
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <span className="break-words" dangerouslySetInnerHTML={{ __html: cleanResponseText(m.content) }} />
                  )}
                </div>
                {m.role === 'user' && (
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mt-1" aria-hidden>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-[#65b330]/20 flex items-center justify-center mt-1" aria-hidden>
                  <svg className="w-4 h-4 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-white/10 border border-white/10 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#65b330]/80 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#65b330]/80 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#65b330]/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            {error && (
              <p className="text-amber-400/90 text-xs text-center">{error}</p>
            )}
          </div>

          {/* Input + crédito */}
          <div className="p-3 border-t border-white/10 bg-black/20">
            <div className="flex gap-2 mb-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={PLACEHOLDER}
                rows={1}
                className="flex-1 resize-none rounded-xl bg-black/50 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65b330]/50 focus:border-[#65b330] focus:shadow-[0_0_0_3px_rgba(101,179,48,0.15)] transition-all"
                disabled={loading}
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#65b330] text-white hover:bg-[#5a9e2a] disabled:opacity-50 disabled:pointer-events-none transition-all hover:shadow-lg hover:shadow-[#65b330]/30"
                aria-label="Enviar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9 2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center">
              Desarrollado con PlotAI de{' '}
              <a href="https://www.plotcenter.com.ar" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#65b330] transition-colors">
                www.plotcenter.com.ar
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
