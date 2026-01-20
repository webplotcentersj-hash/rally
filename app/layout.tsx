import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Safari Tras las Sierras - Rally en Valle Fértil, San Juan',
  description: 'Participá del Safari Tras las Sierras, una competencia de rally única en Valle Fértil, San Juan. Inscribite ahora y sé parte de esta aventura.',
  keywords: 'rally, safari, valle fértil, san juan, competencia, autos, motos',
  openGraph: {
    title: 'Safari Tras las Sierras',
    description: 'Rally en Valle Fértil - San Juan',
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
