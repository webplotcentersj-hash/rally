import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Integración con Supabase (proyecto rally2) para el chat.
 * Usa NEXT_PUBLIC_SUPABASE_RALLY2_URL + NEXT_PUBLIC_SUPABASE_RALLY2_ANON_KEY (o SUPABASE_SERVICE_ROLE_KEY).
 */
const DB_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutos
const MAX_DB_CONTEXT_CHARS = 18000;
let dbCache: { text: string; at: number } | null = null;

function getSupabase(): SupabaseClient | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_RALLY2_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_RALLY2_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Tablas que el chat usa para responder: pilotos, categorías, tiempos de carrera y estado (semáforo). */
const CHAT_TABLES = ['pilots', 'categorias', 'race_times', 'race_status'] as const;

const TABLE_LIMITS: Record<string, number> = {
  pilots: 250,
  categorias: 50,
  race_times: 150,
  race_status: 5,
};

function getTableNames(): string[] {
  return [...CHAT_TABLES];
}

function getLimit(table: string): number {
  return TABLE_LIMITS[table] ?? 200;
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

  const parts: string[] = [];

  // Resumen con conteos para que el asistente siempre sepa "cuántos pilotos hay"
  try {
    const [pilotsRes, categoriasRes] = await Promise.all([
      supabase.from('pilots').select('*', { count: 'exact', head: true }),
      supabase.from('categorias').select('*', { count: 'exact', head: true }),
    ]);
    const nPilots = pilotsRes.count ?? 0;
    const nCategorias = categoriasRes.count ?? 0;
    parts.push(`--- Resumen base de datos ---\nTotal pilotos inscriptos: ${nPilots}. Total categorías: ${nCategorias}. Usá estos números al responder.`);
  } catch (e) {
    console.warn('[chat] Supabase resumen:', e);
  }

  const tables = getTableNames();
  for (const table of tables) {
    try {
      const limit = getLimit(table);
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(limit);

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
