import Image from 'next/image';

export default function Sponsors() {
  const sponsors = [
    {
      id: 1,
      name: 'Sponsor 1',
      logo: 'http://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-166-1.png',
    },
    {
      id: 2,
      name: 'Plot Center',
      logo: 'http://plotcenter.com.ar/wp-content/uploads/2025/05/logo-plot-blanco_Mesa-de-trabajo-1-1.png',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section text-white mb-4">
            Patrocinadores
          </h2>
          <div className="w-20 h-px bg-[#65b330] mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-6xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex items-center justify-center p-6 hover:opacity-80 transition-opacity"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={200}
                height={100}
                className="max-w-[200px] max-h-[100px] w-auto h-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
