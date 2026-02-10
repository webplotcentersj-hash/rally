'use client';

const SORTEO_URL = 'https://safaritraslassierras.com.ar/subitufoto/foto.php';

export default function SorteoFloating() {
  return (
    <a
      href={SORTEO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="sorteo-floating group fixed left-3 bottom-[140px] z-[9999] flex items-center gap-2 rounded-full bg-[#65b330] px-3 py-2.5 text-white shadow-lg transition-all duration-300 hover:bg-[#4a8a26] hover:pr-4 hover:shadow-[#65b330]/40 md:left-4 md:bottom-[160px]"
      aria-label="Participá del sorteo"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
        🎁
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-all duration-300 group-hover:max-w-[200px]">
        Participá del sorteo
      </span>
    </a>
  );
}
