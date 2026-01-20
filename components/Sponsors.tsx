export default function Sponsors() {
  // Placeholder para sponsors - agregar logos reales después
  const sponsors = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Sponsor ${i + 1}`,
    logo: `/sponsor-${i + 1}.png`, // Reemplazar con logos reales
  }));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Patrocinadores
          </h2>
          <div className="w-24 h-1 bg-[#65b330] mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Gracias a nuestros sponsors por hacer posible este evento
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-gray-50 rounded-lg p-6 flex items-center justify-center h-32 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-400 text-sm">{sponsor.name}</span>
              {/* Agregar logos reales cuando estén disponibles */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

