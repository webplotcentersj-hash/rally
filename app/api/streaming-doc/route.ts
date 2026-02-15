import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const DRIVE_FILE_ID = '1PD2o-szuFyIMyBAqBvAW57ubGAy6O5HX';
const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

const PROMPT = `Extrae todo el texto de este PDF tal cual aparece, respetando párrafos y saltos de línea.
Devuelve únicamente el texto extraído, sin añadir títulos, resúmenes ni comentarios.`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Falta configurar GEMINI_API_KEY para extraer el documento.' },
        { status: 503 }
      );
    }

    const res = await fetch(DRIVE_DOWNLOAD_URL, {
      headers: { 'User-Agent': 'SafariTrasLasSierras/1.0' },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'No se pudo descargar el documento desde Google Drive' },
        { status: 502 }
      );
    }

    const contentType = res.headers.get('content-type') || '';
    let buffer: ArrayBuffer;
    if (contentType.includes('text/html')) {
      const html = await res.text();
      const match = html.match(/confirm=([^&]+)/);
      const confirm = match ? match[1] : '';
      const urlWithConfirm = `${DRIVE_DOWNLOAD_URL}${confirm ? `&confirm=${confirm}` : ''}`;
      const res2 = await fetch(urlWithConfirm, {
        headers: { 'User-Agent': 'SafariTrasLasSierras/1.0' },
      });
      if (!res2.ok) {
        return NextResponse.json({ error: 'Error al obtener el PDF' }, { status: 502 });
      }
      buffer = await res2.arrayBuffer();
    } else {
      buffer = await res.arrayBuffer();
    }

    const base64Pdf = Buffer.from(buffer).toString('base64');
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: PROMPT },
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: base64Pdf,
              },
            },
          ],
        },
      ],
      config: {
        maxOutputTokens: 8192,
        temperature: 0.1,
      },
    });

    let text = (response.text ?? '').trim() || 'No se pudo extraer texto del documento.';
    text = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]+/g, ' ').trim();

    return NextResponse.json({ text });
  } catch (err) {
    console.error('streaming-doc error:', err);
    return NextResponse.json(
      { error: 'Error al extraer el contenido del documento' },
      { status: 500 }
    );
  }
}
