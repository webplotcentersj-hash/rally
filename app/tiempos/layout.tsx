import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tiempos | Safari Tras las Sierras',
  description: 'Tiempos oficiales del Safari Tras las Sierras. Resultados en vivo desde la app Safari.',
};

export default function TiemposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
