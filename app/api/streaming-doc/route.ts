import { NextResponse } from 'next/server';

const DRIVE_FILE_ID = '1PD2o-szuFyIMyBAqBvAW57ubGAy6O5HX';
const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
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
    // Google a veces devuelve HTML (ej. confirmación de descarga); si es así, intentar URL alternativa
    let buffer: ArrayBuffer;
    if (contentType.includes('text/html')) {
      // Intentar con confirmación para archivos grandes
      const text = await res.text();
      const match = text.match(/confirm=([^&]+)/);
      const confirm = match ? match[1] : '';
      const urlWithConfirm = `${DRIVE_DOWNLOAD_URL}${confirm ? `&confirm=${confirm}` : ''}`;
      const res2 = await fetch(urlWithConfirm, {
        headers: { 'User-Agent': 'SafariTrasLasSierras/1.0' },
      });
      if (!res2.ok) return NextResponse.json({ error: 'Error al obtener el PDF' }, { status: 502 });
      buffer = await res2.arrayBuffer();
    } else {
      buffer = await res.arrayBuffer();
    }

    const pdfParseModule = await import('pdf-parse') as unknown as
      | { default: (b: Buffer) => Promise<{ text: string }> }
      | ((b: Buffer) => Promise<{ text: string }>);
    const pdfParse = typeof pdfParseModule === 'function'
      ? pdfParseModule
      : pdfParseModule.default;
    const data = await pdfParse(Buffer.from(buffer));
    let text = (data?.text || '').trim() || 'No se pudo extraer texto del documento.';
    // Normalizar: múltiples saltos a doble, quitar espacios de más
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
