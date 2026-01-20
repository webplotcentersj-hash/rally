import Link from 'next/link';

export default function RegistrationInfo() {
  const steps = [
    {
      number: '1',
      title: 'Completá el Formulario',
      description: 'Ingresá todos tus datos personales y del vehículo',
      icon: '📝',
    },
    {
      number: '2',
      title: 'Subí el Comprobante',
      description: 'Adjuntá el comprobante de pago de la inscripción',
      icon: '💳',
    },
    {
      number: '3',
      title: 'Esperá la Aprobación',
      description: 'Nuestro equipo revisará tu inscripción',
      icon: '⏳',
    },
    {
      number: '4',
      title: '¡Participá!',
      description: 'Una vez aprobado, recibirás toda la información',
      icon: '🏁',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#65b330] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#65b330] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-[#65b330] font-bold text-sm uppercase tracking-wider">Cómo Inscribirse</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Proceso Simple y Rápido
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#65b330] to-transparent mx-auto mb-4" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seguí estos pasos y en minutos estarás inscrito
            </p>
          </div>

          {/* Pasos mejorados */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#65b330] to-[#5aa02a] rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform group-hover:scale-105 border-2 border-gray-100 group-hover:border-[#65b330]">
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#65b330] to-[#5aa02a] text-white rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                    {step.number}
                  </div>
                  <div className="text-5xl mb-4 mt-4">{step.icon}</div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Principal mejorado */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#65b330] to-[#5aa02a] rounded-3xl blur-2xl opacity-50" />
            <div className="relative bg-gradient-to-r from-[#65b330] via-[#6bc33a] to-[#5aa02a] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
              {/* Efectos de fondo animados */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float-delay" />
              </div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-4xl md:text-5xl font-black mb-6">
                  ¿Listo para la Aventura?
                </h3>
                <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto">
                  Inscribite ahora y sé parte del Safari Tras las Sierras. 
                  Una experiencia única te espera.
                </p>
                <Link
                  href="https://safari-ashen.vercel.app/inscripcion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block bg-white text-[#65b330] font-black py-5 px-12 rounded-xl text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    🏁 Inscribite Ahora
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
