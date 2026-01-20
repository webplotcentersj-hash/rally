import Link from 'next/link';

export default function RegistrationInfo() {
  const steps = [
    {
      number: '1',
      title: 'Completá el Formulario',
      description: 'Ingresá todos tus datos personales y del vehículo',
    },
    {
      number: '2',
      title: 'Subí el Comprobante',
      description: 'Adjuntá el comprobante de pago de la inscripción',
    },
    {
      number: '3',
      title: 'Esperá la Aprobación',
      description: 'Nuestro equipo revisará tu inscripción',
    },
    {
      number: '4',
      title: '¡Participá!',
      description: 'Una vez aprobado, recibirás toda la información',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cómo Inscribirse
            </h2>
            <div className="w-24 h-1 bg-[#65b330] mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              El proceso de inscripción es simple y rápido
            </p>
          </div>

          {/* Pasos */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#65b330] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Principal */}
          <div className="bg-gradient-to-r from-[#65b330] to-[#5aa02a] rounded-2xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para la Aventura?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Inscribite ahora y sé parte del Safari Tras las Sierras
            </p>
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#65b330] font-bold py-4 px-10 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Inscribite Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

