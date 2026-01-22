import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Safari Tras las Sierras - Safari en Valle Fértil, San Juan',
  description:
    'Participá del Safari Tras las Sierras, una competencia única de safari en Valle Fértil, San Juan. Inscribite ahora y sé parte de esta aventura.',
  keywords: 'safari, valle fértil, san juan, competencia, autos, motos',
  openGraph: {
    title: 'Safari Tras las Sierras',
    description: 'Safari en Valle Fértil - San Juan',
    type: 'website',
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
