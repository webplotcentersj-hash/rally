import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getDbContext } from '@/lib/supabase-chat';

const SAFARI_ASHEN_BASE = 'https://safari-ashen.vercel.app';

const SAFARI_PAGES_ASHEN = [
  { id: 'pilotos' as const, name: 'Pilotos inscriptos', url: `${SAFARI_ASHEN_BASE}/pilotos` },
  { id: 'prensa' as const, name: 'Prensa', url: `${SAFARI_ASHEN_BASE}/prensa` },
  { id: 'inscripcion' as const, name: 'Inscripción', url: `${SAFARI_ASHEN_BASE}/inscripcion` },
  { id: 'inicio_ashen' as const, name: 'Inicio (app Safari)', url: `${SAFARI_ASHEN_BASE}/` },
];

const LANDING_PATHS = [
  { id: 'inicio' as const, name: 'Inicio (esta web)', path: '/' },
  { id: 'cronograma' as const, name: 'Cronograma', path: '/cronograma' },
  { id: 'circuitos' as const, name: 'Circuitos', path: '/circuitos' },
  { id: 'categorias' as const, name: 'Categorías', path: '/categorias' },
  { id: 'reglamento' as const, name: 'Reglamento', path: '/reglamento' },
];

const MAX_TEXT_PER_PAGE = 5500;
const MAX_TOTAL_CONTEXT_CHARS = 22000;
const CACHE_TTL_MS = 5 * 60 * 1000;
const pageCache: Map<string, { text: string; at: number }> = new Map();

const RELEVANCE_KEYWORDS: Record<string, string[]> = {
  pilotos: ['piloto', 'pilotos', 'inscripto', 'inscriptos', 'lista', 'listado', 'categoría', 'categorias', 'competidor', 'número', 'num ', 'nombre', 'apellido', 'quién está', 'quien esta', 'inscrito'],
  prensa: ['prensa', 'medios', 'periodista', 'contacto', 'nota', 'comunicado', 'acreditación', 'acreditacion', 'material', 'foto', 'cobertura'],
  inscripcion: ['inscripción', 'inscribir', 'inscribirme', 'cómo participo', 'como participo', 'inscribirse', 'formulario', 'pago', 'inscribirte'],
  inicio_ashen: ['qué es', 'que es', 'safari', 'valle fértil'],
  inicio: ['inicio', 'home', 'principal', 'esta web', 'esta pagina'],
  cronograma: ['cronograma', 'fechas', 'horario', 'cuándo', 'cuando', 'viernes', 'sábado', 'sabado', 'domingo', 'reunión', 'largada', 'prime', 'podio', '18:00', '21:00', '09:00', '17:00'],
  circuitos: ['circuito', 'circuitos', 'mapa', 'largada', 'coqui quintana', 'balde', 'chilcas', 'san agustín', 'ruta', 'km'],
  categorias: ['categoría', 'categorias', 'categorías'],
  reglamento: ['reglamento', 'reglas', 'normas', 'posición de largada', 'comisario'],
};

function stripHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

async function fetchPageText(url: string, retries = 2): Promise<string> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'SafariTrasLasSierras-Chat/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return '';
      const html = await res.text();
      return stripHtml(html).slice(0, MAX_TEXT_PER_PAGE) || '';
    } catch {
      if (i === retries) return '';
    }
  }
  return '';
}

async function getPageContent(id: string, name: string, url: string): Promise<string> {
  const cached = pageCache.get(id);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.text;
  const text = await fetchPageText(url);
  if (text) pageCache.set(id, { text, at: Date.now() });
  return text;
}

function scoreRelevance(userText: string, pageId: string): number {
  const q = userText.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const keywords = RELEVANCE_KEYWORDS[pageId] || [];
  let score = 0;
  for (const kw of keywords) {
    const k = kw.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    if (q.includes(k)) score += 2;
  }
  if (score === 0) return 1;
  return score;
}

function buildContextByRelevance(
  lastUserMessage: string,
  parts: { id: string; name: string; url: string; text: string }[]
): string {
  const scored = parts
    .filter((p) => p.text.length > 0)
    .map((p) => ({
      ...p,
      score: scoreRelevance(lastUserMessage, p.id),
    }))
    .sort((a, b) => b.score - a.score);

  let total = 0;
  const out: string[] = [];
  for (const { name, url, text } of scored) {
    if (total >= MAX_TOTAL_CONTEXT_CHARS) break;
    const chunk = text.slice(0, MAX_TOTAL_CONTEXT_CHARS - total);
    out.push(`--- ${name} (${url}) ---\n${chunk}`);
    total += chunk.length + name.length + url.length + 20;
  }
  return out.join('\n\n');
}

const SYSTEM_BASE = `Sos el asistente oficial del Safari Tras las Sierras (competencia de autos, Valle Fértil, San Juan, Argentina). Tu rol es dar información precisa y útil.

Reglas:
1. Respondé siempre en español, de forma clara y amable. Sé breve salvo que la pregunta pida detalle.
2. Basate en la información que te pasamos (evento + texto de la web). Si la respuesta está en esa información, usala tal cual; si no está, decilo y sugerí dónde ver más (ej. "En la sección Pilotos de la web podés ver la lista completa").
3. Cuando uses datos de una sección (pilotos, prensa, inicio), podés mencionarlo en una palabra: "Según la lista de pilotos...", "En la sección de prensa..." — solo cuando suma.
4. Para preguntas ambiguas (ej. "¿cuándo es?"), dale la respuesta más útil (fechas del evento) y, si aplica, aclaración corta (cronograma, inscripción, etc.).
5. No inventes datos. Si no sabés algo, indicá que no está en la información disponible y sugerí el enlace o sección correspondiente.
6. Respondé siempre en texto plano: no uses markdown ni asteriscos (*). No uses ** para negrita ni listas con guiones. Escribí oraciones claras y directas, bien limpias.

Datos fijos del evento:
- Fechas: 13, 14 y 15 de febrero.
- Reunión obligatoria: viernes 13/02 a las 18:00, Salón Cultural Municipal (charla AAV, José María Andruccetti). Asistencia obligatoria pilotos o copilotos.
- Largada simbólica: viernes 13/02 a las 21:00, Circuito Coqui Quintana.
- Sábado: Primer Prime 09:00 (36 km), Segundo Prime 12:00 (10 km).
- Domingo: Prime único 09:00 (30 km), podio 17:00. Resultados en TIEMPOS – RC Cronos.
Tenés información de tres fuentes: (1) La app del Safari (pilotos inscriptos, prensa, inscripción, inicio). (2) Esta web oficial (inicio, cronograma, circuitos, categorías, reglamento). (3) La base de datos: pilotos inscriptos (pilots), categorías (categorias), tiempos de carrera (race_times) y estado de la carrera / semáforo (race_status). Usá todo eso para responder con precisión.`;

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Chat no configurado. Falta GEMINI_API_KEY.' },
      { status: 503 }
    );
  }

  let body: { messages?: Message[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 });
  }

  const messages = body.messages as Message[] | undefined;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Se requiere un array de mensajes' }, { status: 400 });
  }

  const baseUrl = req.nextUrl.origin;
  const landingPages = LANDING_PATHS.map((p) => ({
    id: p.id,
    name: p.name,
    url: `${baseUrl}${p.path}`,
  }));
  const allPages = [...SAFARI_PAGES_ASHEN, ...landingPages];

  const lastUser = messages.filter((m) => m.role === 'user').pop()?.content ?? '';
  const pageContents = await Promise.all(
    allPages.map(async (p) => ({
      ...p,
      text: await getPageContent(p.id, p.name, p.url),
    }))
  );
  const safariContext = buildContextByRelevance(lastUser, pageContents);
  let systemInstruction = safariContext
    ? `${SYSTEM_BASE}\n\n--- Información actual de la web del Safari (usá esto para responder) ---\n${safariContext}`
    : SYSTEM_BASE;

  const dbContext = await getDbContext();
  if (dbContext) {
    systemInstruction += `\n\n--- Datos desde la base de datos (pilotos, categorías, tiempos de carrera, estado/semáforo) ---\n${dbContext}`;
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = messages.slice(-24).map((m) => ({
    role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
    parts: [{ text: m.content }],
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 700,
        temperature: 0.5,
      },
    });

    const text = response.text?.trim() ?? 'No pude generar una respuesta.';
    return NextResponse.json({ message: text });
  } catch (e) {
    console.error('Chat API error:', e);
    const err = e as { status?: number; message?: string };
    const status = err?.status;
    let userMessage = 'Error de conexión con el asistente. Intentá más tarde.';
    if (status === 401 || status === 403) {
      userMessage = 'API key inválida o sin permiso. Revisá GEMINI_API_KEY en la configuración (Vercel o .env.local).';
    } else if (status === 429) {
      userMessage = 'Límite de uso de la API alcanzado. Probá en unos minutos.';
    } else if (err?.message?.includes('fetch') || err?.message?.includes('network')) {
      userMessage = 'Error de red. Revisá tu conexión o el estado de la API de Google.';
    }
    return NextResponse.json({ error: userMessage }, { status: 503 });
  }
}
