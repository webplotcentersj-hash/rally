'use client';

import { useState } from 'react';

const sections = [
  {
    title: 'Pilotos',
    items: [
      {
        id: 'inscripcion',
        question: '¿Cómo me inscribo?',
        answer:
          'La inscripción se realiza a través de la app Safari. Entrá al enlace "Inscripción" del menú o desde la app, completá tus datos y el del vehículo, y adjuntá el comprobante de pago. Una vez revisada tu solicitud, recibirás la confirmación con la información del evento.',
      },
      {
        id: 'categorias',
        question: '¿Qué categorías hay?',
        answer:
          'Hay categorías para autos, motos y cuatris. Podés ver el listado completo en la sección Categorías de esta web. Cada categoría tiene sus requisitos; consultá en la inscripción o escribinos si tenés dudas.',
      },
      {
        id: 'posicion-largada',
        question: '¿Cómo se define la posición de largada?',
        answer:
          'En cada categoría: el número 1 larga el ganador de la edición 2025 y el número 2 el ganador de la edición 2024. Si no participan, se van tomando las posiciones siguientes. Se completan los dos primeros lugares así; del tercero para atrás es por orden de inscripción. El comisario deportivo puede cambiar posiciones si lo considera necesario.',
      },
      {
        id: 'llevar',
        question: '¿Qué debo llevar al evento?',
        answer:
          'Documentación del vehículo y personal en regla, equipo de seguridad según tu categoría (casco, indumentaria), y lo que indique el reglamento del Safari. Antes del evento te enviaremos un recordatorio con la lista detallada.',
      },
      {
        id: 'contacto',
        question: '¿Cómo los contacto?',
        answer:
          'Por mail a safari@plotcenter.com.ar o a través de nuestras redes (Instagram y Facebook). Estamos en Valle Fértil, San Juan. El evento es organizado por la Asociación de Pilotos Vallistos (APIVA). Para consultas urgentes podés usar el canal que prefieras.',
      },
    ],
  },
  {
    title: 'Público',
    items: [
      {
        id: 'cuidado-ambiente',
        question: '¿Cómo cuidamos el Safari entre todos?',
        answer:
          'Entre todos cuidamos el Safari. Te pedimos: llevate tu basura, usá los puntos de residuos habilitados, respetá la flora y la fauna, y no arrojes botellas ni latas. Así mantenemos Valle Fértil y el evento para futuras ediciones.',
      },
      {
        id: 'espectadores',
        question: '¿Puedo ir a ver la carrera?',
        answer:
          'Sí, el Safari es un evento para disfrutar en familia o con amigos. Te recomendamos seguir las indicaciones de la organización, respetar las zonas de seguridad y las normas de cuidado del ambiente. Consultá el cronograma para horarios y puntos de paso.',
      },
    ],
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-black py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="title-section font-bold text-white uppercase tracking-tight mb-4">
              Preguntas frecuentes
            </h2>
            <div className="w-24 h-0.5 bg-[#65b330] mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Resolvé las dudas más comunes sobre el Safari Tras las Sierras.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-[#65b330] font-semibold uppercase tracking-wide text-sm mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                      <li
                        key={item.id}
                        className="rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-[#65b330]/30"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white font-medium hover:bg-white/5 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm md:text-base">{item.question}</span>
                          <span
                            className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#65b330]/50 flex items-center justify-center text-[#65b330] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            aria-hidden
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 pt-0">
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/10 pt-4">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
