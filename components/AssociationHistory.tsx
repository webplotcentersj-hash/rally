import Image from 'next/image';

export default function AssociationHistory() {
  return (
    <section className="relative w-full bg-black py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <Image
            src="http://plotcenter.com.ar/wp-content/uploads/2026/01/asociacion-con-historia_1.png"
            alt="Una Asociación con Historia"
            width={1200}
            height={600}
            className="w-full max-w-7xl h-auto object-contain"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
