import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circuitos | Safari Tras las Sierras',
  description: 'Circuitos de autos del Safari Tras las Sierras: largada Sábado Prime 1 y 2, Prime único Domingo (Balde de las Chilcas - San Agustín). Enlaces a Google Maps.',
};

export default function CircuitosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
