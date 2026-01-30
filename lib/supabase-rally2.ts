import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_RALLY2_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_RALLY2_ANON_KEY;

let client: SupabaseClient | null = null;

/** Cliente Supabase del proyecto rally2 (MCP). Solo disponible si están las env vars. */
export function getSupabaseRally2(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

export const hasRally2Config = Boolean(url && anonKey);
