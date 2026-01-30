import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circuitos | Safari Tras las Sierras',
  description: 'Mapa de circuitos de motos del Safari Tras las Sierras.',
};

export default function CircuitosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
