export default function About() {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#65b330] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#65b330] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Título mejorado */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Safari Tras las Sierras
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
              Una competencia única de safari en el corazón de{' '}
              <span className="text-[#65b330] font-semibold">Valle Fértil, San Juan</span>
            </p>
          </div>
          
          {/* Descripción mejorada con diseño más atractivo */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#65b330] rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏔️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Paisajes Espectaculares</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Recorré terrenos desafiantes y paisajes únicos que solo Valle Fértil puede ofrecer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#65b330] rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Adrenalina Pura</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Experimentá la emoción de competir en una aventura que combina pasión, naturaleza y competencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-[#65b330] to-[#5aa02a] rounded-2xl shadow-lg text-white">
                <h3 className="text-2xl font-bold mb-4">¿Qué te espera?</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Rutas desafiantes y emocionantes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Competencia de primer nivel</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Ambiente familiar y deportivo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Premios y reconocimientos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cards de información mejoradas */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-[#65b330] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#65b330] to-[#5aa02a] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fechas</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600 mb-1">🏍️ Motos</p>
                  <p className="text-lg font-bold text-[#65b330]">6, 7, 8 de Febrero</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600 mb-1">🚗 Autos</p>
                  <p className="text-lg font-bold text-[#65b330]">13, 14, 15 de Febrero</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-[#65b330] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#65b330] to-[#5aa02a] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h3>
              <p className="text-lg font-semibold text-[#65b330]">Valle Fértil</p>
              <p className="text-gray-600 mt-2">San Juan, Argentina</p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-[#65b330] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#65b330] to-[#5aa02a] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏁</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categorías</h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-[#65b330]">🚗 Autos</p>
                <p className="text-lg font-semibold text-[#65b330]">🏍️ Motos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
