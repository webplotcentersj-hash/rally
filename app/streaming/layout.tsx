import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Para streaming',
  description:
    'Documento en vivo para streaming del Safari Tras las Sierras. Actualizado en tiempo real.',
};

export default function StreamingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
