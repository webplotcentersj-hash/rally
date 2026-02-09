import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cronograma | Safari Tras las Sierras',
  description:
    'Cronograma Safari Tras las Sierras – Autos: reunión obligatoria 13/02, largada simbólica, primes sábado y domingo, podio 17:00 hs. Valle Fértil.',
};

export default function CronogramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

