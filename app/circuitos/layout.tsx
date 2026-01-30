import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circuitos | Safari Tras las Sierras',
  description: 'Mapas de circuitos del Safari Tras las Sierras. Circuito de motos; próximamente autos.',
};

export default function CircuitosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
