import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-medium mb-4">Safari Tras las Sierras</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Una competencia de rally única en Valle Fértil, San Juan.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://safari-ashen.vercel.app/inscripcion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Inscripción
                </Link>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sobre el Evento
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📍 Valle Fértil, San Juan</li>
              <li>📧 safari@plotcenter.com.ar</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            Desarrollado con ❤️ por <strong className="text-white">Plot Center</strong> 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
