'use client';

const SORTEO_URL = 'https://safaritraslassierras.com.ar/subitufoto/foto.php';

export default function MobileFloatingBar() {
  const openRutas = () => document.getElementById('open-rutas')?.click();
  const openChat = () => document.getElementById('open-chat')?.click();

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9998] flex items-center justify-center gap-0 safe-area-pb bg-black/90 border-t border-[#65b330]/40 px-4 py-3"
      aria-label="Acciones rápidas"
    >
      <button
        type="button"
        onClick={openRutas}
        className="flex flex-1 flex-col items-center gap-1 rounded-xl py-3 px-2 text-white/90 hover:bg-[#65b330]/20 hover:text-white transition-colors min-w-0"
        aria-label="Ver estado de las rutas"
      >
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span className="text-xs font-medium">Rutas</span>
      </button>

      <a
        href={SORTEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center gap-1 rounded-xl py-3 px-2 text-white/90 hover:bg-[#65b330]/20 hover:text-white transition-colors min-w-0"
        aria-label="Participá del sorteo"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-lg">🎁</span>
        <span className="text-xs font-medium">Sorteo</span>
      </a>

      <button
        type="button"
        onClick={openChat}
        className="flex flex-1 flex-col items-center gap-1 rounded-xl py-3 px-2 text-white/90 hover:bg-[#65b330]/20 hover:text-white transition-colors min-w-0"
        aria-label="Abrir chat"
      >
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-xs font-medium">Chat</span>
      </button>
    </div>
  );
}
