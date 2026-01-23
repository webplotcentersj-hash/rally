export default function Features() {
  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Elementos decorativos de huellas en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-20 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,40 Q150,20 300,35 T600,30 T900,40 T1200,35 L1200,80 L0,80 Z" fill="#65b330" opacity="0.3" />
          <path d="M0,45 Q200,25 400,40 T800,35 T1200,40 L1200,80 L0,80 Z" fill="#333" opacity="0.4" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Título principal */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-4">
              SAFARI TRAS LAS SIERRAS
            </h2>
            <div className="w-32 h-0.5 bg-white mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-white">
              Una competencia única de safari en el corazón de{' '}
              <span className="text-[#65b330] font-semibold">Valle Fértil, San Juan.</span>
            </p>
          </div>

          {/* Dos cajas de características */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Caja Paisajes Espectaculares */}
            <div className="bg-gray-100 rounded-xl p-8 border border-white/20 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Paisajes Espectaculares</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Recorré terrenos desafiantes y paisajes únicos que solo Valle Fértil puede ofrecer.
                  </p>
                </div>
              </div>
            </div>

            {/* Caja Adrenalina Pura */}
            <div className="bg-gray-100 rounded-xl p-8 border border-white/20 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Adrenalina Pura</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Experimentá la emoción de competir en una aventura que combina pasión, naturaleza y competencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner "¿Qué te espera?" */}
          <div className="bg-[#65b330] rounded-xl p-6 md:p-8 mb-8 text-center shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white">¿Qué te espera?</h3>
          </div>

          {/* Lista de expectativas */}
          <div className="space-y-4">
            {[
              'Rutas desafiantes y emocionantes',
              'Competencia de primer nivel',
              'Ambiente familiar y deportivo',
              'Premios y reconocimientos'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0">
                <div className="flex-shrink-0 w-8 h-8 bg-[#65b330] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elementos decorativos de huellas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,40 Q150,20 300,35 T600,30 T900,40 T1200,35 L1200,80 L0,80 Z" fill="#65b330" opacity="0.3" />
          <path d="M0,45 Q200,25 400,40 T800,35 T1200,40 L1200,80 L0,80 Z" fill="#333" opacity="0.4" />
        </svg>
      </div>
    </section>
  );
}

