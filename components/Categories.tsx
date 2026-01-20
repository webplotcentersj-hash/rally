export default function Categories() {
  const autoCategories = [
    'A Libre',
    'B 1.000',
    'D',
    'C',
    'C PLUS',
    'D ESPECIAL',
    'D PLUS',
    'RC5 LIGHT',
    'RC5',
    'E',
    'G',
    'H',
    'J',
    'UTV',
    '4x4',
    'FUERZA LIBRE',
  ];

  const motoCategories = [
    '1 SENIOR',
    '2 JUNIOR',
    '3 MASTER A',
    '4 MASTER B',
    '5 MASTER C',
    '6 PROMOCIONALES',
    '7 JUNIOR Kids',
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Efectos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#65b330] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#65b330] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-[#65b330] font-bold text-sm uppercase tracking-wider">Categorías</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
            Elegí tu Categoría
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-4" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participá en la categoría que mejor se adapte a tu vehículo y experiencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Categorías de Auto */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-2xl p-10 shadow-2xl border-2 border-blue-200 group-hover:border-blue-400 transition-all transform group-hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="text-6xl mr-4 animate-bounce-slow">🚗</div>
                <h3 className="text-4xl font-black text-gray-900">Autos</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {autoCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 text-center font-bold text-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:bg-[#65b330] hover:text-white cursor-pointer border-2 border-transparent hover:border-white"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categorías de Moto */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 rounded-2xl p-10 shadow-2xl border-2 border-orange-200 group-hover:border-orange-400 transition-all transform group-hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="text-6xl mr-4 animate-bounce-slow">🏍️</div>
                <h3 className="text-4xl font-black text-gray-900">Motos</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {motoCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 text-center font-bold text-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:bg-[#65b330] hover:text-white cursor-pointer border-2 border-transparent hover:border-white"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
