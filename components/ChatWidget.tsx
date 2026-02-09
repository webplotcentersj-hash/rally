'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const PLACEHOLDER = 'Preguntá sobre el Safari, fechas, inscripción, cronograma...';

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
        className="fixed bottom-20 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#65b330] text-white shadow-lg hover:bg-[#5a9e2a] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#65b330] focus:ring-offset-2 focus:ring-offset-black"
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
        <div className="fixed bottom-36 right-6 z-50 w-[calc(100vw-3rem)] max-w-md rounded-2xl border border-[#65b330]/40 bg-gray-900 shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#65b330]/10">
            <div className="w-8 h-8 rounded-lg bg-[#65b330]/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#65b330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-semibold text-white">Asistente Safari</span>
          </div>

          <div
            ref={listRef}
            className="flex-1 min-h-[240px] max-h-[50vh] overflow-y-auto p-4 space-y-3"
          >
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                Escribí tu pregunta sobre el Safari. Fechas, inscripción, cronograma, circuitos.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-[#65b330] text-white'
                      : 'bg-white/10 text-gray-200 border border-white/10'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl px-3 py-2 bg-white/10 text-gray-400 text-sm flex gap-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                </div>
              </div>
            )}
            {error && (
              <p className="text-amber-400 text-xs text-center">{error}</p>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={PLACEHOLDER}
                rows={1}
                className="flex-1 resize-none rounded-xl bg-black/50 border border-white/20 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65b330]/50 focus:border-[#65b330]"
                disabled={loading}
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[#65b330] text-white hover:bg-[#5a9e2a] disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Enviar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9 2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
