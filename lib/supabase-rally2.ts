import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Rally2 (MCP) - valores por defecto para que la página de categorías use siempre la BD
const RALLY2_URL =
  process.env.NEXT_PUBLIC_SUPABASE_RALLY2_URL || 'https://ywojgfgrekeulalkxlex.supabase.co';
const RALLY2_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_RALLY2_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3b2pnZmdyZWtldWxhbGt4bGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NDcwNzQsImV4cCI6MjA4NDQyMzA3NH0.Es0qPlBihbrJ_t7m9FVIL_kR43Q2gZCCCuF_bO6eEmo';

let client: SupabaseClient | null = null;

/** Cliente Supabase del proyecto rally2 (MCP). Usa env vars o valores por defecto. */
export function getSupabaseRally2(): SupabaseClient {
  if (!client) {
    client = createClient(RALLY2_URL, RALLY2_ANON_KEY);
  }
  return client;
}

export const hasRally2Config = true;
