'use client';

import { useEffect, useState } from 'react';
import ElevenLabsWidget from './ElevenLabsWidget';

/** Solo renderiza el widget en desktop; en móvil queda solo el de la barra. */
export default function ElevenLabsWidgetDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isDesktop) return null;
  return <ElevenLabsWidget />;
}
