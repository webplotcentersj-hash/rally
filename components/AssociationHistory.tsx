'use client';

export default function AssociationHistory() {
  // Imágenes de la galería - usando rutas directas con espacios codificados manualmente
  const galleryImages = [
    { id: 1, src: '/insumos%20para%20figma-01.jpg%20(1).jpeg', alt: 'Historia del Safari 1' },
    { id: 2, src: '/insumos%20para%20figma-06.jpg.jpeg', alt: 'Historia del Safari 2' },
    { id: 3, src: '/insumos%20para%20figma-07.jpg.jpeg', alt: 'Historia del Safari 3' },
    { id: 4, src: '/insumos%20para%20figma-08.jpg%20(1).jpeg', alt: 'Historia del Safari 4' },
  ];

  const backgroundImageUrl = 'http://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-1-3.png';

  return (
    <section className="py-16 md:py-24 relative overflow-visible min-h-[600px] bg-gray-900 -mt-20 md:-mt-32">
      {/* Fondo con imagen - extendido hacia arriba */}
      <div 
        className="absolute inset-0 z-0 -top-20 md:-top-32"
        style={{
          backgroundImage: `url("${backgroundImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center -10%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      
      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-[2]">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              UNA ASOCIACIÓN CON HISTORIA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto" />
          </div>

          {/* Contenido: Texto y Galería */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Texto */}
            <div className="space-y-6 text-white text-base md:text-lg leading-relaxed drop-shadow-md">
              <p>
                En APIVA recordamos que el Safari tras las Sierras nació en 1992 como un simple desafío entre amigos de Valle Fértil, apasionados por los autos y las gincanas. Aquella primera carrera, organizada casi de manera improvisada y con un asado como premio, nos mostró que había algo especial que merecía crecer.
              </p>
              <p>
                Con el tiempo formamos APIVA y asumimos la organización del evento, que fue sumando participantes, categorías y público. Lo que empezó como una aventura local se transformó en un clásico del automovilismo sanjuanino, atrayendo pilotos de todo el país y convirtiendo febrero en una verdadera fiesta para Valle Fértil.
              </p>
              <p>
                Hoy, después de más de treinta años, el Safari tras las Sierras sigue manteniendo su espíritu original de aventura, camaradería y amor por nuestra tierra, siendo un orgullo para todos los que formamos parte de APIVA.
              </p>
            </div>

            {/* Galería de Fotos */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-2xl hover:shadow-[#65b330]/50 transition-all duration-300 hover:scale-105 bg-gray-800"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      console.error('Error cargando:', image.src);
                      const target = e.target as HTMLImageElement;
                      target.style.backgroundColor = '#333';
                    }}
                    onLoad={() => {
                      console.log('Imagen cargada:', image.src);
                    }}
                  />
                  <div className="absolute inset-0 bg-[#65b330]/0 group-hover:bg-[#65b330]/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
