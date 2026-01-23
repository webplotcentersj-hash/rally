export default function Gallery() {
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/gallery-${i + 1}.jpg`,
    alt: `Imagen ${i + 1} del Safari Tras las Sierras`,
  }));

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Galería
          </h2>
          <div className="w-20 h-px bg-[#65b330] mx-auto mb-8" />
          <p className="text-lg text-gray-600">
            Momentos inolvidables
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 group cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-sm">Imagen {image.id}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
