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
    <section id="categorias" className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Categorías
          </h2>
          <div className="w-20 h-px bg-[#65b330] mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elegí tu categoría y participá
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Categorías de Auto */}
          <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="text-4xl mr-4">🚗</div>
              <h3 className="text-2xl font-light text-gray-900">Autos</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {autoCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700 hover:bg-[#65b330] hover:text-white transition-colors cursor-pointer"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Categorías de Moto */}
          <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="text-4xl mr-4">🏍️</div>
              <h3 className="text-2xl font-light text-gray-900">Motos</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {motoCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700 hover:bg-[#65b330] hover:text-white transition-colors cursor-pointer"
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
