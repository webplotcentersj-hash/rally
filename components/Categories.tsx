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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Categorías
          </h2>
          <div className="w-24 h-1 bg-[#65b330] mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elegí tu categoría y participá en la competencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Categorías de Auto */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="text-5xl mr-4">🚗</div>
              <h3 className="text-3xl font-bold text-gray-900">Autos</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {autoCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 text-center text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Categorías de Moto */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="text-5xl mr-4">🏍️</div>
              <h3 className="text-3xl font-bold text-gray-900">Motos</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {motoCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 text-center text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

