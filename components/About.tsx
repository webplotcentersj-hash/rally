export default function About() {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre el Evento
          </h2>
          <div className="w-24 h-1 bg-[#65b330] mx-auto mb-12" />
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            El <strong>Safari Tras las Sierras</strong> es una competencia de rally única que se realiza en 
            el hermoso Valle Fértil, San Juan. Una experiencia inolvidable que combina la pasión por los 
            vehículos todo terreno con el desafío de recorrer paisajes espectaculares.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fechas</h3>
              <p className="text-gray-600">Próximamente</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ubicación</h3>
              <p className="text-gray-600">Valle Fértil, San Juan</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Categorías</h3>
              <p className="text-gray-600">Autos y Motos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

