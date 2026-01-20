export default function About() {
  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#65b330] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#65b330] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-[#65b330] font-bold text-sm uppercase tracking-wider">Sobre el Evento</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Una Aventura Única
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
                El <strong className="text-[#65b330]">Safari Tras las Sierras</strong> es una competencia de rally única que se realiza en 
                el hermoso <strong>Valle Fértil, San Juan</strong>.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Una experiencia inolvidable que combina la pasión por los vehículos todo terreno con el desafío 
                de recorrer paisajes espectaculares y terrenos desafiantes.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Participá de esta aventura única donde la adrenalina, la naturaleza y la competencia se encuentran 
                en uno de los lugares más hermosos de Argentina.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#65b330]/20 to-[#5aa02a]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#65b330]/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-black/30 rounded-xl">
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-xl font-bold text-[#65b330] mb-2">Fechas</h3>
                    <p className="text-gray-300">Próximamente</p>
                  </div>
                  
                  <div className="text-center p-6 bg-black/30 rounded-xl">
                    <div className="text-5xl mb-4">📍</div>
                    <h3 className="text-xl font-bold text-[#65b330] mb-2">Ubicación</h3>
                    <p className="text-gray-300">Valle Fértil</p>
                    <p className="text-gray-300">San Juan</p>
                  </div>
                  
                  <div className="text-center p-6 bg-black/30 rounded-xl col-span-2">
                    <div className="text-5xl mb-4">🏁</div>
                    <h3 className="text-xl font-bold text-[#65b330] mb-2">Categorías</h3>
                    <div className="flex justify-center gap-4 mt-4">
                      <span className="px-4 py-2 bg-[#65b330]/20 rounded-lg text-sm font-semibold">🚗 Autos</span>
                      <span className="px-4 py-2 bg-[#65b330]/20 rounded-lg text-sm font-semibold">🏍️ Motos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
