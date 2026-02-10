'use client';

/**
 * Snippet oficial ElevenLabs. El script se carga en app/layout.tsx.
 * <elevenlabs-convai agent-id="..."></elevenlabs-convai>
 * <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
 */
export default function ElevenLabsWidget() {
  return (
    <div className="elevenlabs-widget-wrapper" aria-label="Asistente de voz ElevenLabs">
      <elevenlabs-convai agent-id="agent_5201kh3nd49bfkqarvfcsh526pag" />
    </div>
  );
}
