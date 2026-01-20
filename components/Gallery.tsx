export default function Gallery() {
  // Placeholder para imágenes - puedes agregar las imágenes reales después
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/gallery-${i + 1}.jpg`, // Reemplazar con imágenes reales
    alt: `Imagen ${i + 1} del Safari Tras las Sierras`,
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Galería
          </h2>
          <div className="w-24 h-1 bg-[#65b330] mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Momentos inolvidables de ediciones anteriores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Imagen {image.id}</span>
              </div>
              {/* Agregar imágenes reales cuando estén disponibles */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

