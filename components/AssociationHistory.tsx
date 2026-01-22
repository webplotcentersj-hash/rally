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
    <section className="relative overflow-hidden bg-[#65b330]">
      {/* Header marrón con textura de tierra */}
      <div className="relative h-16 md:h-20 bg-[#5a4a3a] overflow-hidden">
        {/* Textura de tierra con huellas de neumáticos */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 40 50 50 T100 50' stroke='%23333' stroke-width='2' fill='none' opacity='0.3'/%3E%3Cpath d='M0 60 Q25 50 50 60 T100 60' stroke='%23333' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }} />
        </div>
        {/* Patrón de textura adicional */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a3a2a] to-[#5a4a3a] opacity-50"></div>
      </div>

      {/* Título con textura rugosa */}
      <div className="bg-[#65b330] py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.3)',
            letterSpacing: '0.05em',
          }}>
            UNA ASOCIACIÓN CON HISTORIA
          </h2>
        </div>
      </div>

      {/* Contenido principal: Foto grande a la izquierda, texto a la derecha */}
      <div className="bg-[#65b330] pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
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
              <div className="space-y-6 text-white text-base md:text-lg leading-relaxed">
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
      </div>

      {/* Línea verde oscura al final */}
      <div className="h-2 bg-[#4a7a2a]"></div>
    </section>
  );
}
