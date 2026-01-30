import { getSupabaseRally2 } from './supabase-rally2';

const SAFARI_APP_URL = process.env.NEXT_PUBLIC_SAFARI_APP_URL || 'https://safari-ashen.vercel.app';

export interface CategoriasData {
  autos: string[];
  motos: string[];
  cuatris: string[];
}

/** Listas por defecto cuando ni rally2 ni la API devuelven datos */
export const DEFAULT_CATEGORIAS: CategoriasData = {
  autos: [
    '1 A libres',
    '2 B 1000',
    '4 C',
    '5 C plus',
    '6 D Plus',
    '7 D Especial',
    '8 RC5 8v',
    '9 RC5 16v',
    '10 E',
    '11 G',
    '12 Jeep Libres',
    '13 Fuerza Libre',
    '14 4X4',
    '15 Integrales',
    '16 UTV Aspirados',
    '17 UTV Turbos',
    'Mejor Vallisto',
    'GENERAL',
  ],
  motos: [
    '1 SENIOR',
    '2 JUNIOR',
    '3 MASTER A',
    '4 MASTER B',
    '5 MASTER C',
    '6 PROMOCIONALES',
    '7 JUNIOR Kids',
  ],
  cuatris: [
    '250 chino',
    'Categoría Cuatris 1',
    'Categoría Cuatris 2',
    'Categoría Cuatris 3',
  ],
};

/** Respuesta posible de la API de categorías (autos/motos/cuatris o array con tipo) */
interface CategoriasApiResponse {
  autos?: string[];
  motos?: string[];
  cuatris?: string[];
  categorias?: { tipo: 'autos' | 'motos' | 'cuatris'; nombre: string }[];
}

function normalizeFromApi(data: CategoriasApiResponse): CategoriasData {
  if (data.autos?.length || data.motos?.length || data.cuatris?.length) {
    return {
      autos: data.autos ?? [],
      motos: data.motos ?? [],
      cuatris: data.cuatris ?? [],
    };
  }
  if (Array.isArray(data.categorias) && data.categorias.length > 0) {
    const autos: string[] = [];
    const motos: string[] = [];
    const cuatris: string[] = [];
    for (const c of data.categorias) {
      if (c.tipo === 'autos') autos.push(c.nombre);
      else if (c.tipo === 'motos') motos.push(c.nombre);
      else if (c.tipo === 'cuatris') cuatris.push(c.nombre);
    }
    return { autos, motos, cuatris };
  }
  return DEFAULT_CATEGORIAS;
}

/**
 * Obtiene categorías: primero desde Supabase rally2 (MCP), luego API Safari, luego listas por defecto.
 */
export async function fetchCategorias(): Promise<CategoriasData> {
  // 1) Supabase rally2 (tabla categorias) - siempre intentamos la BD primero
  try {
    const supabase = getSupabaseRally2();
    const { data: rows, error } = await supabase
      .from('categorias')
      .select('tipo, nombre, orden')
      .order('tipo', { ascending: true })
      .order('orden', { ascending: true });

    if (!error && rows && rows.length > 0) {
      const autos: string[] = [];
      const motos: string[] = [];
      const cuatris: string[] = [];
      for (const r of rows as { tipo: string; nombre: string }[]) {
        if (r.tipo === 'autos') autos.push(r.nombre);
        else if (r.tipo === 'motos') motos.push(r.nombre);
        else if (r.tipo === 'cuatris') cuatris.push(r.nombre);
      }
      if (autos.length || motos.length || cuatris.length) {
        return { autos, motos, cuatris };
      }
    }
  } catch {
    // seguir a API o default
  }

  // 2) API Safari
  try {
    const endpoints = [
      `${SAFARI_APP_URL}/api/categorias`,
      `${SAFARI_APP_URL}/api/categories`,
    ];
    for (const url of endpoints) {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const json: CategoriasApiResponse = await res.json();
      const data = normalizeFromApi(json);
      const hasAny = data.autos.length > 0 || data.motos.length > 0 || data.cuatris.length > 0;
      if (hasAny) return data;
    }
  } catch {
    // API no disponible o CORS
  }

  return DEFAULT_CATEGORIAS;
}
