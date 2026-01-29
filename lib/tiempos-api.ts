const SAFARI_APP_URL = process.env.NEXT_PUBLIC_SAFARI_APP_URL || 'https://safari-ashen.vercel.app';

export interface TiempoItem {
  id?: string;
  posicion: number;
  piloto: string;
  copiloto?: string;
  categoria: string;
  numero?: string | number;
  tiempo_total?: string;
  diferencia?: string;
  [key: string]: unknown;
}

export interface TiemposResponse {
  tiempos?: TiempoItem[];
  data?: TiempoItem[];
  error?: string;
}

export async function fetchTiempos(): Promise<TiempoItem[]> {
  try {
    const endpoints = [
      `${SAFARI_APP_URL}/api/tiempos`,
      `${SAFARI_APP_URL}/api/resultados`,
      `${SAFARI_APP_URL}/api/times`,
    ];

    for (const url of endpoints) {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const json: TiemposResponse = await res.json();
      const list = json.tiempos ?? json.data ?? (Array.isArray(json) ? json : []);
      if (Array.isArray(list) && list.length > 0) {
        return list as TiempoItem[];
      }
    }
  } catch {
    // API no disponible o CORS
  }
  return [];
}
