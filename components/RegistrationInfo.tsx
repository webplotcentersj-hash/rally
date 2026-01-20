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
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Cómo Inscribirse
            </h2>
            <div className="w-20 h-px bg-[#65b330] mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proceso simple en 4 pasos
            </p>
          </div>

          {/* Pasos minimalistas */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#65b330] text-white rounded-full flex items-center justify-center font-light text-2xl mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* CTA minimalista */}
          <div className="text-center">
            <Link
              href="https://safari-ashen.vercel.app/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#65b330] hover:bg-[#5aa02a] text-white font-medium py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Inscribite Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
