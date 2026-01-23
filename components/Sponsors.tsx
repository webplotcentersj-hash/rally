export default function Sponsors() {
  const sponsors = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Sponsor ${i + 1}`,
    logo: `/sponsor-${i + 1}.png`,
  }));

  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Patrocinadores
          </h2>
          <div className="w-20 h-px bg-[#65b330] mx-auto mb-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-gray-50 rounded-lg p-8 flex items-center justify-center h-32 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-400 text-sm">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
