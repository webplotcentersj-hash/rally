import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import EstadoRutasFloating from '@/components/EstadoRutasFloating';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://safaritraslassierras.com.ar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Safari Tras las Sierras | Competencia Enduro y Travesía en Valle Fértil, San Juan',
    template: '%s | Safari Tras las Sierras',
  },
  description:
    'Safari Tras las Sierras: competencia de enduro, travesía y cuatris en Valle Fértil, San Juan. Inscribite al Safari 2026. Cronograma, circuitos, reglamento e información oficial.',
  keywords: [
    'Safari Tras las Sierras',
    'safari Valle Fértil',
    'enduro San Juan',
    'travesía motos',
    'competencia motocross',
    'Valle Fértil',
    'San Juan',
    'APIVA',
    'ASER',
    'cuatris',
    'inscripción safari 2026',
  ],
  authors: [{ name: 'Safari Tras las Sierras', url: SITE_URL }],
  creator: 'Safari Tras las Sierras',
  publisher: 'Safari Tras las Sierras',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Safari Tras las Sierras',
    title: 'Safari Tras las Sierras | Enduro y Travesía en Valle Fértil, San Juan',
    description:
      'Competencia de enduro, travesía y cuatris en Valle Fértil. Inscribite al Safari 2026. Cronograma, circuitos y reglamento oficial.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Safari Tras las Sierras - Valle Fértil, San Juan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safari Tras las Sierras | Valle Fértil, San Juan',
    description: 'Competencia de enduro y travesía en Valle Fértil. Inscribite al Safari 2026.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'sports',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  other: {
    'geo.region': 'AR-J',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
        <EstadoRutasFloating />
      </body>
    </html>
  );
}
