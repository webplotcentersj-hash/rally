export default function About() {
  return (
    <section id="sobre" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Safari Tras las Sierras
            </h2>
            <div className="w-20 h-px bg-[#65b330] mx-auto mb-12" />
          </div>
          
          <div className="space-y-8 text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            <p>
              Una competencia de rally única en el corazón de <strong className="text-gray-900">Valle Fértil, San Juan</strong>.
            </p>
            <p>
              Experimentá la adrenalina de recorrer paisajes espectaculares y terrenos desafiantes en una aventura 
              que combina pasión, naturaleza y competencia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center p-8">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fechas</h3>
              <p className="text-gray-600">Próximamente</p>
            </div>
            
            <div className="text-center p-8">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ubicación</h3>
              <p className="text-gray-600">Valle Fértil, San Juan</p>
            </div>
            
            <div className="text-center p-8">
              <div className="text-4xl mb-4">🏁</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Categorías</h3>
              <p className="text-gray-600">Autos y Motos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
