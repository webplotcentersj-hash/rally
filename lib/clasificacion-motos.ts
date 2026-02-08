/**
 * Clasificación Motos – Campeonato Travesía y Enduro.
 * Primeros por categoría (resumen). La clasificación completa está en los PDFs.
 */

export type PrimerPorCategoria = {
  categoria: string;
  primero: string;
  numero?: string;
};

export type CampeonatoClasificacion = {
  titulo: string;
  pdfUrl: string;
  pdfNombreDescarga: string;
  primeros: PrimerPorCategoria[];
};

export const CAMPEONATO_TRAVESIA: CampeonatoClasificacion = {
  titulo: 'Campeonato Travesía',
  pdfUrl: '/pdfs/CampeonatoTravesiaSafariTrasLaSierra.pdf',
  pdfNombreDescarga: 'CampeonatoTravesiaSafariTrasLaSierra.pdf',
  primeros: [
    { categoria: 'Categoría A', primero: '—', numero: '—' },
    { categoria: 'Categoría B', primero: '—', numero: '—' },
    { categoria: 'Categoría C', primero: '—', numero: '—' },
    { categoria: 'Otras', primero: 'Ver PDF completo', numero: '' },
  ],
};

export const CAMPEONATO_ENDURO: CampeonatoClasificacion = {
  titulo: 'Campeonato Enduro',
  pdfUrl: '/pdfs/CampeonatoEnduroASER.SafariTrasLaSierra.pdf',
  pdfNombreDescarga: 'CampeonatoEnduroASER.SafariTrasLaSierra.pdf',
  primeros: [
    { categoria: 'Categoría 1', primero: '—', numero: '—' },
    { categoria: 'Categoría 2', primero: '—', numero: '—' },
    { categoria: 'Categoría 3', primero: '—', numero: '—' },
    { categoria: 'Otras', primero: 'Ver PDF completo', numero: '' },
  ],
};
