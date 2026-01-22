'use client';

export default function AssociationHistory() {
  // Imágenes de la galería
  const galleryImages = [
    { id: 1, src: '/insumos%20para%20figma-01.jpg%20(1).jpeg', alt: 'Historia del Safari 1' },
    { id: 2, src: '/insumos%20para%20figma-06.jpg.jpeg', alt: 'Historia del Safari 2' },
    { id: 3, src: '/insumos%20para%20figma-07.jpg.jpeg', alt: 'Historia del Safari 3' },
    { id: 4, src: '/insumos%20para%20figma-08.jpg%20(1).jpeg', alt: 'Historia del Safari 4' },
  ];

  // Usar la primera imagen como foto principal
  const mainImage = galleryImages[0];

  return (
    <section className="relative overflow-visible bg-transparent">
      {/* Fondo verde con textura - extendido hacia arriba para superponerse */}
      <div 
        className="absolute inset-0 z-0 -top-24 md:-top-40 bg-[#65b330]"
        style={{
          backgroundImage: `url("http://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-1-3.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center -15%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Textura de tierra/huellas sobre el fondo verde */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q50 80 100 100 T200 100' stroke='%23000' stroke-width='3' fill='none' opacity='0.4'/%3E%3Cpath d='M0 120 Q50 100 100 120 T200 120' stroke='%23000' stroke-width='3' fill='none' opacity='0.4'/%3E%3Cpath d='M20 90 Q40 85 60 90 T100 90' stroke='%23000' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat',
          }} />
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-[2] pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Título - mismo tamaño que otros */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              UNA ASOCIACIÓN CON HISTORIA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
          </div>

          {/* Contenido principal: Foto grande a la izquierda, texto a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pb-16 md:pb-24">
            {/* Foto principal a la izquierda */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error cargando:', mainImage.src);
                  const target = e.target as HTMLImageElement;
                  target.style.backgroundColor = '#333';
                }}
              />
            </div>

            {/* Texto a la derecha */}
            <div className="space-y-6 text-white text-base md:text-lg leading-relaxed drop-shadow-md">
              <p>
                En APIVA recordamos que el Safari tras las Sierras nació en 1992 como un <strong className="font-bold">simple desafío entre amigos de Valle Fértil</strong>, apasionados por los autos y las gincanas. Aquella primera carrera, organizada casi de manera improvisada y con un asado como premio, nos mostró que había algo especial que merecía crecer.
              </p>
              <p>
                Con el tiempo formamos APIVA y asumimos la organización del evento, que fue sumando participantes, categorías y público. Lo que empezó como una aventura local se transformó en un <strong className="font-bold">clásico del automovilismo sanjuanino</strong>, atrayendo pilotos de todo el país y convirtiendo febrero en una verdadera fiesta para Valle Fértil.
              </p>
              <p>
                Hoy, después de más de treinta años, el Safari tras las Sierras sigue manteniendo su espíritu original de aventura, camaradería y amor por nuestra tierra, siendo un orgullo para todos los que formamos parte de APIVA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Línea verde oscura al final */}
      <div className="relative z-[2] h-2 bg-[#4a7a2a]"></div>
    </section>
  );
}
