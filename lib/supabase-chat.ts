import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DB_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutos
const MAX_DB_CONTEXT_CHARS = 12000;
let dbCache: { text: string; at: number } | null = null;

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Solo estas tablas se usan para el chat: pilotos inscriptos y categorías. */
const CHAT_TABLES = ['pilots', 'categorias'] as const;

function getTableNames(): string[] {
  return [...CHAT_TABLES];
}

function formatRows(tableName: string, rows: unknown[]): string {
  if (rows.length === 0) return `(tabla ${tableName}: sin filas)`;
  const lines = rows.map((row, i) => {
    const r = row as Record<string, unknown>;
    const parts = Object.entries(r)
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => `${k}: ${v}`);
    return `${i + 1}. ${parts.join(' | ')}`;
  });
  return lines.join('\n');
}

/**
 * Obtiene contexto desde la base de datos para el asistente.
 * Devuelve string vacío si no hay Supabase configurado o hay error.
 */
export async function getDbContext(): Promise<string> {
  if (dbCache && Date.now() - dbCache.at < DB_CACHE_TTL_MS) {
    return dbCache.text;
  }

  const supabase = getSupabase();
  if (!supabase) return '';

  const tables = getTableNames();
  const parts: string[] = [];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(200);

      if (error) {
        console.warn(`[chat] Supabase ${table}:`, error.message);
        continue;
      }
      if (data && data.length > 0) {
        parts.push(`--- Base de datos: ${table} ---\n${formatRows(table, data)}`);
      }
    } catch (e) {
      console.warn(`[chat] Supabase ${table}:`, e);
    }
  }

  const text = parts.join('\n\n').slice(0, MAX_DB_CONTEXT_CHARS);
  if (text) dbCache = { text, at: Date.now() };
  return text;
}
