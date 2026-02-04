import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cronograma | Safari Tras las Sierras',
  description:
    'Cronograma completo del Safari Tras las Sierras: administrativas, entrenamientos, clasificaciones y carreras del fin de semana.',
};

export default function CronogramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

