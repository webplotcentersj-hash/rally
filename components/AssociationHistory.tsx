'use client';

import Image from 'next/image';

export default function AssociationHistory() {
  // Imágenes de la galería
  const galleryImages = [
    { id: 1, src: '/insumos para figma-01.jpg (1).jpeg', alt: 'Historia del Safari 1' },
    { id: 2, src: '/insumos para figma-06.jpg.jpeg', alt: 'Historia del Safari 2' },
    { id: 3, src: '/insumos para figma-07.jpg.jpeg', alt: 'Historia del Safari 3' },
    { id: 4, src: '/insumos para figma-08.jpg (1).jpeg', alt: 'Historia del Safari 4' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              UNA ASOCIACIÓN CON HISTORIA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto" />
          </div>

          {/* Contenido: Texto y Galería */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Texto */}
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
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
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback si la imagen no existe
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-[#65b330]/20 to-gray-300 flex items-center justify-center">
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  {/* Overlay en hover */}
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

