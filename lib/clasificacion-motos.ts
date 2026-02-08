/**
 * Clasificación Motos – Sábado (Travesía + Enduro) y Domingo.
 * Datos extraídos de los PDFs oficiales (primeros por categoría).
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

/** Clasificación Sábado – Campeonato Travesía (PDF CampeonatoTravesiaSafariTrasLaSierra.pdf) */
export const CAMPEONATO_TRAVESIA: CampeonatoClasificacion = {
  titulo: 'Campeonato Travesía',
  pdfUrl: '/pdfs/CampeonatoTravesiaSafariTrasLaSierra.pdf',
  pdfNombreDescarga: 'CampeonatoTravesiaSafariTrasLaSierra.pdf',
  primeros: [
    { categoria: '110CC LIBRE', primero: 'NORTE CRISTIAN', numero: '53' },
    { categoria: '110CC SEMI', primero: 'OLIVA ALEXANDER', numero: '48' },
    { categoria: '150CC CHINA', primero: 'FUNEZ FRANCO', numero: '136' },
    { categoria: '200CC CHINA', primero: 'CHAVEZ DANIEL', numero: '34' },
    { categoria: '250CC 4V', primero: 'LEON FRANCO', numero: '160' },
    { categoria: '250CC CHINA', primero: 'DOMINGUEZ NICOLAS', numero: '156' },
    { categoria: 'CUADRI 450CC OPEN', primero: 'DOMINGUEZ ALDO', numero: '49' },
    { categoria: 'CUADRI 200CC CHINO', primero: 'QUIROGA MARTINA', numero: '184' },
    { categoria: 'CUADRI 250CC CHINO', primero: 'CASIVAR LAUTARO', numero: '77' },
    { categoria: 'CUADRI KIDS', primero: 'JUAN ESTEBAN', numero: '46' },
  ],
};

/** Clasificación Sábado – Campeonato Enduro ASER (PDF CampeonatoEnduroASER.SafariTrasLaSierra.pdf) */
export const CAMPEONATO_ENDURO: CampeonatoClasificacion = {
  titulo: 'Campeonato Enduro',
  pdfUrl: '/pdfs/CampeonatoEnduroASER.SafariTrasLaSierra.pdf',
  pdfNombreDescarga: 'CampeonatoEnduroASER.SafariTrasLaSierra.pdf',
  primeros: [
    { categoria: 'SENIOR A', primero: 'MARTINEZ JUAN CRUZ', numero: '1' },
    { categoria: 'JUNIOR A', primero: 'BOLZONELLA TOMAS', numero: '234' },
    { categoria: 'JUNIOR B', primero: 'TORRENTE DIEGO', numero: '33' },
    { categoria: 'MASTER SENIOR', primero: 'VARGAS BENJAMÍN', numero: '41' },
    { categoria: 'MASTER A', primero: 'GARCIA FEDERICO', numero: '253' },
    { categoria: 'MASTER B', primero: 'TRIAS MARCELO', numero: '213' },
    { categoria: 'MASTER C', primero: 'GARCIA ANTONIO', numero: '237' },
    { categoria: 'MASTER D', primero: 'LÓPEZ FRANCISCO', numero: '195' },
    { categoria: 'PROMOCIONAL', primero: 'CARBAJAL JUAQUIN', numero: '100' },
    { categoria: 'PRINCIPIANTE', primero: 'SANTOS DAMIAN', numero: '35' },
    { categoria: 'ENDURO', primero: 'AURIEME LUCIANO', numero: '90' },
    { categoria: 'JUNIORS KIDS A', primero: 'JOFRE IARA', numero: '264' },
    { categoria: 'JUNIORS KIDS B', primero: 'HIERREZUELO VALENTIN', numero: '210' },
  ],
};

/** Clasificación Domingo – resultados por categorías (PDF SafariSJASERDomingo.pdf) */
export const CLASIFICACION_DOMINGO: CampeonatoClasificacion = {
  titulo: 'Domingo',
  pdfUrl: '/pdfs/SafariSJASERDomingo.pdf',
  pdfNombreDescarga: 'SafariSJASERDomingo.pdf',
  primeros: [
    { categoria: '110CC LIBRE', primero: 'ELIZONDO FABIAN ANDRES', numero: '125' },
    { categoria: '110CC SEMI', primero: 'OLIVA ALEXANDER', numero: '48' },
    { categoria: '150CC CHINA', primero: 'FUNEZ FRANCO', numero: '136' },
    { categoria: '200CC CHINA', primero: 'FERREIRA VALENTINO', numero: '147' },
    { categoria: '250CC 4V', primero: 'BECERRA LUCAS', numero: '163' },
    { categoria: '250CC CHINA', primero: 'SOLIS EMANUEL', numero: '158' },
    { categoria: 'CUADRI 450CC OPEN', primero: 'DOMINGUEZ ALDO', numero: '49' },
    { categoria: 'CUADRI 200CC CHINO', primero: 'CHAVEZ FERNANDO', numero: '171' },
    { categoria: 'CUADRI 250CC CHINO', primero: 'CASIVAR LAUTARO', numero: '77' },
    { categoria: 'CUADRI KIDS', primero: 'JUAN ESTEBAN', numero: '46' },
    { categoria: 'JUNIORS KIDS B', primero: 'HIERREZUELO VALENTIN', numero: '210' },
  ],
};
