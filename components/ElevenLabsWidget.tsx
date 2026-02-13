'use client';

import { useEffect, useRef } from 'react';

const AGENT_ID = 'agent_5201kh3nd49bfkqarvfcsh526pag';
const SCRIPT_URL = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

type Props = { embedInBar?: boolean };

export default function ElevenLabsWidget({ embedInBar }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document === 'undefined' || !containerRef.current) return;

    if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', AGENT_ID);
    containerRef.current.appendChild(widget);
  }, []);

  return (
    <div
      ref={containerRef}
      className={embedInBar ? 'elevenlabs-widget-wrapper elevenlabs-in-bar' : 'elevenlabs-widget-wrapper'}
      aria-label="Asistente de voz ElevenLabs"
    />
  );
}
